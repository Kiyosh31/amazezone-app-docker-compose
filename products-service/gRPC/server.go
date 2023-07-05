package gRPC

import (
	"context"
	"log"
	"net"
	"os"

	pb "products-service/proto/pb"

	"google.golang.org/grpc"
)

type ProductsServer struct {
	pb.UnimplementedProductsServer
}

func getGrpcPort() string {
	port := ":" + os.Getenv("GRPC_PORT")

	if port == "" {
		port = ":50051"
	}

	return port
}

func (s *ProductsServer) GetProducts(ctx context.Context, in *pb.GetProductRequest) (*pb.GetProductResponse, error) {
	return &pb.GetProductResponse{
		Product: &pb.Product{
			Id:          "1",
			Description: "Description",
			Name:        "Name",
			Price:       123,
			Rate:        5,
		},
	}, nil
}

func StartServer() {
	port := getGrpcPort()
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen in port: %s", port)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)

	pb.RegisterProductsServer(grpcServer, ProductsServer{})
	log.Printf("gRPC server listening at: %s", lis.Addr())
	if err = grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve gRPC: %s", err)
	}
}
