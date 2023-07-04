#!/bin/bash

rm -rf products/
mkdir products/
protoc --go_out=./products --go_opt=paths=source_relative \
    --go-grpc_out=./products --go-grpc_opt=paths=source_relative \
    products.proto
