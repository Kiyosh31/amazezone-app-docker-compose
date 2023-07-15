package models

type ProductComments struct {
	UserName   string  `json:"userName" bson:"userName"`
	Comment    string  `json:"comment" bson:"comment"`
	RatingStar float64 `json:"ratingStar" bson:"ratingStar"`
}

type Product struct {
	Name        string            `json:"name" bson:"name"`
	Description string            `json:"description" bson:"description"`
	Price       float64           `json:"price" bson:"price"`
	Brand       string            `json:"brand" bson:"brand"`
	Stars       float64           `json:"stars" bson:"stars"`
	Comments    []ProductComments `json:"productComments" bson:"productComments"`
}
