package main

import (
	"os"
	"products-service/routes"

	"github.com/gofiber/fiber/v2"
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

	routes.RegisterRoutes(app)

	app.Listen(port)

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
