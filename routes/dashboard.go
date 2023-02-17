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
