package controllers

import (
	"context"
	"os"
	"products-service/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateProduct(c *fiber.Ctx) error {
	newProduct := new(models.ProductsModel)

	if err := c.BodyParser(newProduct); err != nil {
		return err
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin insertOne
	coll := client.Database(os.Getenv("DB_NAME")).Collection("products")

	result, err := coll.InsertOne(context.TODO(), newProduct)
	if err != nil {
		panic(err)
	}

	return c.JSON(result)
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
	filter := bson.D{{"name", "product1"}}

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

	id, _ := primitive.ObjectIDFromHex("64af29e8cab466a1b82fa9e4")
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
