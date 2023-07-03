package controllers

import (
	"context"
)

type productsServer struct{}

func (s productsServer) GetProduct(context.Context, *Product.GetProductRequest) (*ProductResponse, error) {
	return ProductReponse{}
}
