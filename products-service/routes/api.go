package routes

import (
	"product-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Product Routes
	products := api.Group("/products")
	products.Post("", controllers.CreateProduct)
}
