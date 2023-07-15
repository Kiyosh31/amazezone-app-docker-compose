package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"products-service/database"
	"products-service/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateProduct(c *fiber.Ctx) error {
	productsCollection := database.GetCollection()

	newProduct := new(models.ProductsModel)
	if err := c.BodyParser(newProduct); err != nil {
		return err
	}

	res, err := productsCollection.InsertOne(context.TODO(), newProduct)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error creating product")
	}

	return c.JSON(res)
}

func GetAllProducts(c *fiber.Ctx) error {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin findOne
	coll := client.Database(os.Getenv("DB_NAME")).Collection("products")
	filter := bson.D{{}}

	cursor, err := coll.Find(context.TODO(), filter)

	var products []models.ProductsModel

	if err = cursor.All(context.TODO(), &products); err != nil {
		panic(err)
	}

	for _, result := range products {
		cursor.Decode(&result)
		output, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s\n", output)
	}

	return c.JSON(products)
}

func GetProduct(c *fiber.Ctx) error {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin findOne
	coll := client.Database(os.Getenv("DB_NAME")).Collection("products")
	id, _ := primitive.ObjectIDFromHex(c.Params("id"))
	filter := bson.D{{"_id", id}}

	var product models.ProductsModel
	err = coll.FindOne(context.TODO(), filter).Decode(&product)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			// This error means your query did not match any documents.
			return err
		}
		panic(err)
	}

	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin findOne
	coll := client.Database(os.Getenv("DB_NAME")).Collection("products")

	id, _ := primitive.ObjectIDFromHex(c.Params("id"))
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"seller", "no te mames si funciona"}}}}

	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		panic(err)
	}

	return c.JSON(result)
}

func DeleteProduct(c *fiber.Ctx) error {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin findOne
	coll := client.Database(os.Getenv("DB_NAME")).Collection("products")
	filter := bson.D{{"name", "product2"}}

	result, err := coll.DeleteOne(context.TODO(), filter)
	if err != nil {
		panic(err)
	}

	return c.JSON(result)
}
