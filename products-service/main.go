package main

import (
	"products-service/api"
	"products-service/database"
	"products-service/utils"

	"github.com/gin-gonic/gin"
)

var log = utils.Logger()

func main() {
	router := gin.New()
	gin.SetMode(gin.DebugMode)

	api.RegisterRoutes(router)

	err := database.ConnectToDB()
	if err != nil {
		log.Panic(err)
	}

	port := ":" + utils.GetEnvVar("PORT")
	router.Run(port)

	defer database.DisconnectOfDB()
	defer utils.CloseLogsFile()
}
