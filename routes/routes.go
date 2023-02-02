package routes

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type TestType struct {
	TeamName string `json:"teamName"`
	TasksSum int    `json:"tasksSum"`
	Date     string `db:"date" json:"date"`
}

func InitCustomRoutes(app *pocketbase.PocketBase) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		e.Router.GET("/dashboard-summary", func(c echo.Context) error {
			var taskCount int
			var rejectedTasksCount int
			var acceptedTasksCount int

			// user, _ := c.Get(apis.ContextAuthRecordKey).(*models.Record)

			// if user == nil {
			// 	return c.JSON(401, map[string]interface{}{
			// 		"error": "You must be authenticated to access this route",
			// 	})
			// }

			err := app.Dao().CollectionQuery().
				Select("count(*)").
				From("tasks").
				GroupBy("date").
				Row(&taskCount)

			err = app.Dao().CollectionQuery().
				Select("count(*)").
				From("tasks").
				AndWhere(dbx.Not(dbx.HashExp{"accepted": ""})).
				Row(&acceptedTasksCount)

			err = app.Dao().CollectionQuery().
				Select("count(*)").
				From("tasks").
				AndWhere(dbx.Not(dbx.HashExp{"rejected": ""})).
				Row(&rejectedTasksCount)

			if err != nil {
				return c.JSON(200, map[string]interface{}{
					"error": err.Error(),
				})
			}

			err = app.Dao().AdminQuery().Select("count(*)").From("tasks").Row(&taskCount)

			if err != nil {
				return c.JSON(200, map[string]interface{}{
					"error": err.Error(),
				})
			}

			return c.JSON(200, map[string]interface{}{
				"totalTasks":    taskCount,
				"acceptedTasks": acceptedTasksCount,
				"rejectedTasks": rejectedTasksCount,
			})
		})

		e.Router.GET("/test", func(c echo.Context) error {
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
		})

		return nil
	})
}
