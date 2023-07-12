package main

import (
	"log"
	"os"
	"path/filepath"
	"products-service/database"
	"products-service/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func getServicePort() string {
	port := ":" + os.Getenv("PORT")

	if port == ":" {
		port = ":3002"
	}

	return port
}

func main() {
	port := getServicePort()
	app := fiber.New()

	app.Use(logger.New(logger.Config{
		Format: "[${time}]:${port} ${status} - ${method} ${path}\n",
	}))

	// Create folder if not exists
	path := filepath.Join(".", "logs")

	if _, err := os.Stat(path); os.IsNotExist(err) {
		err := os.Mkdir(path, os.ModePerm)
		if err != nil {
			log.Fatalf("Error creating logs foler: %v", err)
		}
	}

	// Custom File Writer
	file, err := os.OpenFile("./logs/all.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()
	app.Use(logger.New(logger.Config{
		Output: file,
	}))

	routes.RegisterRoutes(app)

	app.Listen(port)
	database.ConnectToDB()

	// go gRPC.StartGrpcServer()
	// go gRPC.StartGrpcClient()

	// port := getServicePort()
	// list, err := net.Listen("tcp", port)
	// log.Printf("Server listening")
	// if err != nil {
	// 	log.Fatalf("Products-service could not serve: %s", err)
	// }

	// gRPC.StartServer()
	// database.ConnectToDB()
}
