package database

import (
	"context"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client

func ConnectMongoDB() error {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		panic("")
		// log the env var must be here
	}

	var err error
	MongoClient, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	return nil
}

func CloseMongoDB() {
	err := MongoClient.Disconnect(context.TODO())
	if err != nil {
		panic(err)
	}
}

func GetCollection() *mongo.Collection {
	return MongoClient.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION"))
}
