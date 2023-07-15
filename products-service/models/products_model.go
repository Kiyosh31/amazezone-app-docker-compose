package models

type ProductsModel struct {
	ID          string  `json:"_id" bson:"_id"`
	Name        string  `json:"name"  bson:"name"`
	Description string  `json:"description"  bson:"description"`
	Seller      string  `json:"seller"  bson:"seller"`
	Stars       float64 `json:"stars"  bson:"stars"`
	Price       float64 `json:"price"  bson:"price"`
	Brand       string  `json:"brand"  bson:"brand"`
	// Comments    models.CommentsModel `json:"comments"`
}
