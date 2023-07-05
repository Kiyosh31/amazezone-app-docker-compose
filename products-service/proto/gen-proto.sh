#!/bin/bash

rm -rf pb/
mkdir pb/
protoc --go_out=./pb --go_opt=paths=source_relative \
    --go-grpc_out=./pb --go-grpc_opt=paths=source_relative \
    products.proto
