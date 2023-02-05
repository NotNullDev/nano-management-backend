package main

import (
	"github.com/notnulldev/nano-management-backend/db"
	"github.com/notnulldev/nano-management-backend/routes"
	"github.com/pocketbase/pocketbase"
)

func main() {
	app := pocketbase.New()

	routes.InitCustomRoutes(app)
	db.InitHooks(app)

	err := app.Start()

	if err != nil {
		panic(err)
	}
}
