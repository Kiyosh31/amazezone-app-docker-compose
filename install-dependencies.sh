#!/bin/bash

# Node dependencies
cd user-service/
npm i
cd graphql-service/
npm i
cd frontend-service/
npm i

# Go dependencies
cd products-service
go mod download