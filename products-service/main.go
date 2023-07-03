package main

import (
	"log"
	"net"
	"os"

	pb "products-service/proto/products"

	"google.golang.org/grpc"
)

func getPort() string {
	port := ":" + os.Getenv("PORT")

	if port == "" {
		port = ":3002"
	}

	return port
}

func main() {
	port := getPort()
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen in port: %s", port)
	}

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)

	pb.RegisterProductsServer(grpcServer)

	err = grpcServer.Serve(lis)
	if err != nil {
		log.Fatalf("gRPC server could not start: %s", err)
	}
}
