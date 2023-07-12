package routes

import (
	"products-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api")

	products := api.Group("/products")
	products.Get("", controllers.GetProduct)
	products.Post("", controllers.CreateProduct)
	products.Put("", controllers.UpdateProduct)
	products.Delete("", controllers.DeleteProduct)

}
