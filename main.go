package main

import (
	"github.com/notnulldev/nano-management-backend/routes"
	"github.com/pocketbase/pocketbase"
)

func main() {
	app := pocketbase.New()

	routes.InitCustomRoutes(app)

	err := app.Start()

	if err != nil {
		panic(err)
	}
}
