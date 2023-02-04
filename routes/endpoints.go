package routes

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/models"
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
				order by tasks.date DESC, teams.name`).
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

func GetTasksHistory(c echo.Context, app *pocketbase.PocketBase) error {

	authRecord := c.Get(apis.ContextAuthRecordKey)

	if authRecord == nil {
		print("user is not authenticated")
	} else {
		user := authRecord.(*models.Record)
		print(user.Email())
	}

	//print(user.Email())

	sql := `
			select
				t.id as task_id, t.date as task_date, t.duration as task_duration, t.accepted as task_accepted, t.rejected as task_rejected, t.comment as task_comment,
				act.id as activity_id, act.name as activity_name,
				tm.id as team_id, tm.name as team_name,
				pr.id as project_id, pr.name as project_name,
				u.id as user_id, u.name as user_name, u.email as user_email
			from tasks t
					 inner join activities act on t.activity = act.id
					 inner join teams tm on t.team = tm.id
					 inner join projects pr on tm.project = pr.id
					 inner join users u on t.user = u.id
			where t.deleted = ''
			order by date desc
			limit 10;
`
	var tasksHistory = []TasksHistoryRecord{}

	err := app.Dao().DB().
		NewQuery(sql).
		All(&tasksHistory)

	if err != nil {
		return c.JSON(200, "omg!!")
	}

	return c.JSON(200, tasksHistory)
}
