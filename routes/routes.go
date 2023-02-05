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

		e.Router.GET("/dashboard-summary",
			func(c echo.Context) error {
				return GetDashboardSummary(c, app)
			},
			apis.ActivityLogger(app),
		)

		e.Router.GET("/tasks-history",
			func(c echo.Context) error {
				return GetTasksHistory(c, app)
			},
			apis.ActivityLogger(app),
		)

		return nil
	})
}
