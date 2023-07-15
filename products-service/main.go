package main

import (
	"os"
	"product-service/database"
	"product-service/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func getPort() string {
	port := ":" + os.Getenv("PORT")

	if port == ":" {
		port += "3002"
	}

	return port
}

func main() {
	app := fiber.New()

	app.Use(logger.New())
	routes.RegisterRoutes(app)

	err := database.ConnectToDB()
	if err != nil {
		panic(err)
	}
	app.Listen(getPort())
	defer database.DisconnectOfDB()
}
