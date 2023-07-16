package routes

import (
	"product-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Product Routes
	productGroup := api.Group("/products")
	productGroup.Post("", controllers.CreateProduct)
	productGroup.Get("/", controllers.GetAllProducts)
	productGroup.Get("/:id", controllers.GetProduct)
	productGroup.Put("/:id", controllers.UpdateProduct)
	productGroup.Delete("/:id", controllers.DeleteProject)
}
