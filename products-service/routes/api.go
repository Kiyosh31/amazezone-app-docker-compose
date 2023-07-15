package routes

import (
	"products-service/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api")

	productsApi := api.Group("/products")
	productsApi.Get("/", controllers.GetAllProducts)
	productsApi.Get("/:id", controllers.GetProduct)
	productsApi.Post("", controllers.CreateProduct)
	productsApi.Put("/:id", controllers.UpdateProduct)
	productsApi.Delete("/:id", controllers.DeleteProduct)

}
