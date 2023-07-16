package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ProductComments struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	ProductId  primitive.ObjectID `bson:"productId"`
	UserName   string             `bson:"userName"`
	Comment    string             `bson:"comment"`
	RatingStar float64            `bson:"ratingStar"`
}

type Product struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Name        string             `bson:"name"`
	Description string             `bson:"description"`
	Price       float64            `bson:"price"`
	Brand       string             `bson:"brand"`
	Stars       float64            `bson:"stars"`
}
