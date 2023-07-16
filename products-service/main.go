package main

import (
	"log"
	"os"
	"path/filepath"
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

	// loggerformat := "[${time}]: [${path}] | ${method}-${status} | Request Headers: ${TagReqHeader} | Request Body: ${body} | Response body: ${resBody}"
	// timeFormat := "2006-01-02 15:04:05"

	app.Use(logger.New(logger.Config{
		Format: "${time} | ${status} | ${method} | ${path} | Request Headers: ${headers} | Request Body: ${body} | Response Body: ${resBody}",
	}))

	newpath := filepath.Join(".", "logs")
	err := os.MkdirAll(newpath, os.ModePerm)
	if err != nil {
		log.Fatalf("Error creating logs folder: %v", err)
		panic(err)
	}

	file, err := os.OpenFile("./logs/all.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()
	app.Use(logger.New(logger.Config{
		Output: file,
	}))

	routes.RegisterRoutes(app)

	err = database.ConnectToDB()
	if err != nil {
		panic(err)
	}
	app.Listen(getPort())
	defer database.DisconnectOfDB()
}
