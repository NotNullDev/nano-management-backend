package routes

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/models"
	"strconv"
)

func GetDashboardSummary(c echo.Context, app *pocketbase.PocketBase) error {
	var tests []TestType

	user := c.Get(apis.ContextAuthRecordKey).(*models.Record)

	app.Dao().DB().NewQuery(`
				select
					teams.name as team_name, sum(tasks.duration) as tasks_sum, strftime('%m.%Y', tasks.date) as date
				from tasks
				INNER JOIN teams on tasks.team = teams.id
			 	where tasks.user = {:userId}
				group by teams.name, strftime('%m.%Y', tasks.date)
				order by tasks.date DESC, teams.name;
`).
		Bind(dbx.Params{"userId": user.Id}).
		All(&tests)

	return c.JSON(200, tests)
}

type TasksHistoryRecord struct {
	TaskId       string `json:"taskId"`
	TaskDate     string `json:"taskDate"`
	TaskDuration int    `json:"taskDuration"`
	TaskAccepted string `json:"taskAccepted"`
	TaskRejected string `json:"taskRejected"`
	TaskComment  string `json:"taskComment"`

	ActivityId   string `json:"activityId"`
	ActivityName string `json:"activityName"`

	TeamId   string `json:"teamId"`
	TeamName string `json:"teamName"`

	ProjectId   string `json:"projectId"`
	ProjectName string `json:"projectName"`

	UserId    string `json:"userId"`
	UserName  string `json:"userName"`
	UserEmail string `json:"userEmail"`
}

type TaskHistoryParams struct {
	IdFilter       string `query:"idFilter"`
	TeamFilter     string `query:"teamFilter"`
	ProjectFilter  string `query:"projectFilter"`
	UserFilter     string `query:"userFilter"`
	StatusFilter   string `query:"statusFilter"`
	DateFromFilter string `query:"dateFromFilter"`
	DateToFilter   string `query:"dateToFilter"`

	Page  string `query:"page"`
	Limit string `query:"limit"`

	TeamSort         string `query:"teamSort"`
	UserSort         string `query:"userSort"`
	TaskDurationSort string `query:"taskDurationSort"`
	DateSort         string `query:"dateSort"`
}

func GetTasksHistory(c echo.Context, app *pocketbase.PocketBase) error {

	authRecord := c.Get(apis.ContextAuthRecordKey)

	params := TaskHistoryParams{}

	if err := c.Bind(&params); err != nil {
		return err
	}

	if authRecord == nil {
		print("user is not authenticated")
	} else {
		user := authRecord.(*models.Record)
		print(user.Email())
	}

	baseQuery := app.Dao().DB().Select("t.id as task_id",
		"t.date as task_date",
		"t.duration as task_duration",
		"t.accepted as task_accepted",
		"t.rejected as task_rejected",
		"t.comment as task_comment",
		"act.id as activity_id",
		"act.name as activity_name",
		"tm.id as team_id",
		"tm.name as team_name",
		"pr.id as project_id",
		"pr.name as project_name",
		"u.id as user_id",
		"u.name as user_name",
		"u.email as user_email").
		From("tasks t").
		InnerJoin("activities act", dbx.NewExp("t.activity = act.id")).
		InnerJoin("teams tm", dbx.NewExp("t.team = tm.id")).
		InnerJoin("projects pr", dbx.NewExp("tm.project = pr.id")).
		InnerJoin("users u", dbx.NewExp("t.user = u.id"))

	parseParamsAndAppendToSelectQuery(baseQuery, params)

	var tasksHistory []TasksHistoryRecord

	err := baseQuery.Build().All(&tasksHistory)

	if err != nil {
		return c.JSON(200, "omg !!!")
	}

	return c.JSON(200, tasksHistory)
}

/*
IdFilter       string `query:"idFilter"`
TeamFilter     string `query:"teamFilter"`
ProjectFilter  string `query:"projectFilter"`
UserFilter     string `query:"userFilter"`
StatusFilter   string `query:"statusFilter"`
DateFromFilter string `query:"dateFromFilter"`
DateToFilter   string `query:"dateToFilter"`

Page  string `query:"page"`
Limit string `query:"limit"`

TeamSort         string `query:"teamSort"`
UserSort         string `query:"userSort"`
TaskDurationSort string `query:"taskDurationSort"`
DateSort         string `query:"dateSort"`
*/
func parseParamsAndAppendToSelectQuery(selectQuery *dbx.SelectQuery, params TaskHistoryParams) {
	if params.IdFilter != "" {
		exp := dbx.NewExp("t.id = {:idFilter}", dbx.Params{"idFilter": params.IdFilter})
		selectQuery.AndWhere(exp)
	}

	if params.TeamFilter != "" {
		exp := dbx.NewExp("tm.id = {:teamFilter}", dbx.Params{"teamFilter": params.TeamFilter})
		selectQuery.AndWhere(exp)
	}

	if params.ProjectFilter != "" {
		exp := dbx.NewExp("pr.id = {:projectFilter}", dbx.Params{"projectFilter": params.ProjectFilter})
		selectQuery.AndWhere(exp)
	}

	if params.UserFilter != "" {
		exp := dbx.Like("u.name", params.UserFilter)
		exp1 := dbx.Like("u.email", params.UserFilter)
		selectQuery.AndWhere(dbx.Or(exp, exp1))
	}

	if params.StatusFilter != "" {
		if params.StatusFilter == "accepted" {
			exp := dbx.NewExp("t.accepted = ''")
			selectQuery.AndWhere(dbx.Not(exp))
		}

		if params.StatusFilter == "rejected" {
			exp := dbx.NewExp("t.rejected = ''")
			selectQuery.AndWhere(dbx.Not(exp))
		}
	}

	if params.DateFromFilter != "" {
		exp := dbx.NewExp("t.date >= {:dateFromFilter}", dbx.Params{"dateFromFilter": params.DateFromFilter})
		selectQuery.AndWhere(exp)
	}

	if params.DateToFilter != "" {
		exp := dbx.NewExp("t.date <= {:dateToFilter}", dbx.Params{"dateToFilter": params.DateToFilter})
		selectQuery.AndWhere(exp)
	}

	if params.TeamSort != "" {
		selectQuery.OrderBy("tm.name " + parseSort(params.TeamSort))
	}

	if params.UserSort != "" {
		selectQuery.OrderBy("u.name " + parseSort(params.UserSort))
	}

	if params.DateSort != "" {
		selectQuery.OrderBy("t.date " + parseSort(params.DateSort))
	}

	if params.TaskDurationSort != "" {
		selectQuery.OrderBy("t.duration " + parseSort(params.TaskDurationSort))
	}

	if params.Page != "" && params.Limit != "" {
		pageLimit, err := strconv.ParseInt(params.Limit, 10, 64)

		if err != nil {
			pageLimit = 10
		}

		pageOffset, err := strconv.ParseInt(params.Page, 10, 64)

		if err != nil {
			pageOffset = 0
		}

		selectQuery.Limit(pageLimit).Offset(pageOffset)
	}
}

// to prevent sql inj
func parseSort(sort string) string {
	if sort == "desc" {
		return "desc"
	}

	return "asc"
}
