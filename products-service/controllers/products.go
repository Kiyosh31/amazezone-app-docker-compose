package controllers

import (
	"context"
	"log"
	"product-service/database"
	"product-service/models"

	"github.com/gofiber/fiber/v2"
)

func CreateProduct(c *fiber.Ctx) error {
	log.Println("[CreateProduct]: request incoming...")

	newProduct := new(models.Product)

	if err := c.BodyParser(newProduct); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"errors": err.Error(),
		})
	}

	col := database.GetCollection()
	res, err := col.InsertOne(context.TODO(), newProduct)
	if err != nil {
		log.Fatalf("Product could not be created: %v", err)
	}

	return c.JSON(res)
}
