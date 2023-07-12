package models

type ProductsModel struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Seller      string  `json:"seller"`
	Stars       int64   `json:"stars"`
	Price       float64 `json:"price"`
	Brand       string  `json:"brand"`
	// Comments    models.CommentsModel `json:"comments"`
}
