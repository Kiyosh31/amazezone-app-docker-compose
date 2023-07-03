package main

import "os"

func getPort() string {
	port := ":" + os.Getenv("PORT")

	if port == "" {
		port = ":3002"
	}

	return port
}

func main() {

}
