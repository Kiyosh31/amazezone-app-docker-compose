package main

import (
	"os"
	"products-service/database"
)

func getServicePort() string {
	port := ":" + os.Getenv("PORT")

	if port == "" {
		port = ":3002"
	}

	return port
}

func main() {
	// port := getServicePort()
	// list, err := net.Listen("tcp", port)
	// log.Printf("Server listening")
	// if err != nil {
	// 	log.Fatalf("Products-service could not serve: %s", err)
	// }

	// gRPC.StartServer()
	database.ConnectToDB()
}
