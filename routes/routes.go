package routes

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

type TestType struct {
	TeamName string `json:"teamName"`
	TasksSum int    `json:"tasksSum"`
	Date     string `db:"date" json:"date"`
}

func InitCustomRoutes(app *pocketbase.PocketBase) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		g := e.Router.Group("/api")

		g.GET("/dashboard-summary",
			func(c echo.Context) error {
				return GetDashboardSummary(c, app)
			},
			apis.ActivityLogger(app),
		)

		g.GET("/tasks-history",
			func(c echo.Context) error {
				return GetTasksHistory(c, app)
			},
			apis.ActivityLogger(app),
		)

		g.GET("/management-data", func(c echo.Context) error {
			return GetManagementData(c, app)
		}, apis.ActivityLogger(app))

		g.POST("/update-tasks-statuses", func(c echo.Context) error {
			return UpdateTasksStatuses(c, app)
		})

		return nil
	})
}
