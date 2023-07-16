package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"product-service/database"
	"product-service/models"
	"product-service/utils"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateProduct(c *fiber.Ctx) error {
	newProduct := new(models.Product)

	if err := c.BodyParser(newProduct); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(utils.ErrorMap(err))
	}

	col := database.GetCollection()
	res, err := col.InsertOne(context.TODO(), newProduct)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
	}

	return c.JSON(res)
}

func GetAllProducts(c *fiber.Ctx) error {
	filter := bson.D{{}}

	col := database.GetCollection()
	cursor, err := col.Find(context.TODO(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
	}

	var results []models.Product
	if err = cursor.All(context.TODO(), &results); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
	}

	for _, result := range results {
		cursor.Decode(&result)
		output, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
		}
		fmt.Printf("%s\n", output)
	}

	return c.JSON(results)
}

func GetProduct(c *fiber.Ctx) error {
	id := utils.GetMongoId(c.Params("id"))
	filter := bson.D{{Key: "_id", Value: id}}

	var product models.Product
	col := database.GetCollection()
	err := col.FindOne(context.TODO(), filter).Decode(&product)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
	}

	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	id := utils.GetMongoId(c.Params("id"))
	filter := bson.D{{Key: "_id", Value: id}}
	updateProductInfo := new(models.Product)

	if err := c.BodyParser(updateProductInfo); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"errors": err.Error(),
		})
	}

	update := bson.D{{Key: "$set", Value: updateProductInfo}}

	col := database.GetCollection()
	res, err := col.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
	}

	return c.JSON(res)
}

func DeleteProject(c *fiber.Ctx) error {
	id := utils.GetMongoId(c.Params("id"))
	filter := bson.D{{Key: "_id", Value: id}}

	col := database.GetCollection()
	res, err := col.DeleteOne(context.TODO(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrorMap(err))
	}

	return c.JSON(res)
}
