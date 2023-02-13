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

	err := app.Dao().DB().NewQuery(`
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

	if err != nil {
		return err
	}

	return c.JSON(200, tests)
}

/*
select
    pr.id as project_id ,pr.name as project_name,
    tm.id as team_id, tm.name as team_name,
    strftime('%d.%m.%Y', date) as date, sum(duration) as duration_summary
from tasks t
inner join teams tm on t.team = tm.id
inner join projects pr on tm.project = pr.id
group by strftime('%d.%m.%Y', date), tm.id;
*/

type ManagementDataQueryParams struct {
	Team string `query:"teamId"`
}

type ManagementData struct {
	UserId    string `json:"userId"`
	UserName  string `json:"userName"`
	UserEmail string `json:"userEmail"`

	ProjectId   string `json:"projectId"`
	ProjectName string `json:"projectName"`

	TeamId   string `json:"teamId"`
	TeamName string `json:"teamName"`

	Date            string `json:"date"`
	DurationSummary int    `json:"durationSummary"`
}

func GetManagementData(c echo.Context, app *pocketbase.PocketBase) error {
	var result []ManagementData
	var queryParams ManagementDataQueryParams

	if err := c.Bind(&queryParams); err != nil {
		return err
	}

	currentUser := c.Get(apis.ContextAuthRecordKey).(*models.Record)

	if currentUser == nil {
		return c.JSON(401, "User is not authenticated")
	}

	selectQuery := app.Dao().DB().Select(
		"u.id as user_id", "u.name as user_name", "u.email as user_email",
		"pr.id as project_id", "pr.name as project_name",
		"tm.id as team_id", "tm.name as team_name",
		"strftime('%d.%m.%Y',date) as date",
		"sum(duration) as duration_summary",
	).
		From("tasks t").
		InnerJoin("teams tm", dbx.NewExp("t.team = tm.id")).
		InnerJoin("projects pr", dbx.NewExp("tm.project = pr.id")).
		InnerJoin("users u", dbx.NewExp("t.user = u.id")).
		GroupBy("strftime('%d.%m.%Y',date)", "tm.id", "pr.id", "u.id")

	if queryParams.Team != "" {
		selectQuery.AndWhere(dbx.NewExp("tm.id = {:teamId}", dbx.Params{"teamId": queryParams.Team}))
	}

	selectQuery.AndWhere(dbx.NewExp("t.status = 'none'", dbx.Params{"teamId": queryParams.Team}))

	err := selectQuery.All(&result)

	if err != nil {
		return err
	}

	return c.JSON(200, result)
}

type UpdateTaskStatusParams struct {
	Days   []string `json:"days"`
	UserId string   `json:"userId"`
	Status string   `json:"status"`
}

func UpdateTasksStatuses(c echo.Context, app *pocketbase.PocketBase) error {
	var tasksToUpdate UpdateTaskStatusParams

	if err := c.Bind(&tasksToUpdate); err != nil {
		return err
	}

	if len(tasksToUpdate.Days) == 0 {
		return c.JSON(200, "No tasks to update")
	}

	nextTaskStatus := GetTaskStatus(tasksToUpdate.Status)

	var asInterfaces []interface{}

	for _, day := range tasksToUpdate.Days {
		asInterfaces = append(asInterfaces, day)
	}

	result, err := app.Dao().DB().
		Update("tasks",
			dbx.Params{
				"status": nextTaskStatus,
			},
			dbx.And(
				dbx.NewExp("user = {:userId}", dbx.Params{"userId": tasksToUpdate.UserId}),
				dbx.In("strftime('%d.%m.%Y', date)", asInterfaces...),
			)).
		Execute()

	if err != nil {
		return err
	}

	affected, _ := result.RowsAffected()

	return c.JSON(200, affected)
}

func GetTaskStatus(status string) string {
	if status == "accepted" {
		return "accepted"
	}

	if status == "rejected" {
		return "rejected"
	}

	return "none"
}

type TasksHistoryRecord struct {
	TaskId       string `json:"taskId"`
	TaskDate     string `json:"taskDate"`
	TaskDuration int    `json:"taskDuration"`
	TaskStatus   string `json:"taskStatus"`
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
		"t.status as task_status",
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
		exp := dbx.NewExp("t.status = {:statusFilter}", dbx.Params{"statusFilter": params.StatusFilter})
		selectQuery.AndWhere(exp)
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
