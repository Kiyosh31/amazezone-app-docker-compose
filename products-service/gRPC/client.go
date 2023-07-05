package gRPC

// import (
// 	"context"
// 	"log"
// 	"time"

// 	pb "products-service/proto/pb"

// 	"google.golang.org/grpc"
// )

// func Client() {
// 	port := getGrpcPort()
// 	conn, err := grpc.Dial(port, grpc.WithInsecure(), grpc.WithBlock())
// 	if err != nil {
// 		log.Fatalf("Client could not serve: %s", err)
// 	}
// 	defer conn.Close()

// 	client := pb.NewProductsClient(conn)

// 	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
// 	defer cancel()
// }
