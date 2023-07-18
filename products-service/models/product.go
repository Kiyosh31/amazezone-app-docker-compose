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
	Name        string             `bson:"name" binding:"required"`
	Description string             `bson:"description" binding:"required"`
	Price       float64            `bson:"price" binding:"required"`
	Brand       string             `bson:"brand" binding:"required"`
	Stars       float64            `bson:"stars" binding:"required"`
}
