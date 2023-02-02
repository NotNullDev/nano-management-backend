package routes

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

type TestType struct {
	TeamName string `json:"teamName"`
	TasksSum int    `json:"tasksSum"`
	Date     string `db:"date" json:"date"`
}

func InitCustomRoutes(app *pocketbase.PocketBase) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/test",
			func(c echo.Context) error {
				return GetDashboardSummary(c, app)
			},
		)
		return nil
	})
}
