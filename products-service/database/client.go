package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client

func ConnectToDB() error {
	uri := os.Getenv("MONGO_URI")

	if uri == "" {
		log.Fatal("You must provide MONGO_URI in env")
	}

	var err error
	MongoClient, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	return nil
}

func DisconnectOfDB() {
	err := MongoClient.Disconnect(context.TODO())
	if err != nil {
		panic(err)
	}
}

func GetCollection() *mongo.Collection {
	db := os.Getenv("DB_NAME")
	col := os.Getenv("DB_COLLECTION")
	if db == "" {
		panic("DB_NAME is missing in env")
	}
	if col == "" {
		panic("DB_COLLECTION is missing in env")
	}

	return MongoClient.Database(db).Collection(col)
}
