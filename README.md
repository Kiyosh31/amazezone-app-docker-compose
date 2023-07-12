# Introduction

This is a personal project made to understand and create a microservices architecture from scratch, I will continue adding features, info and diagrams as I keep working on this

# instructions

## Pre-requisites

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Docker Compose](https://docs.docker.com/compose/)
3. Being able to run Makefiles
4. Node.js ^18.16.1

## Installation

1. Clone the repo

```console
https://github.com/Kiyosh31/amazezone-app.git
```

2. Create `.env` file with the values, there is an example on root project

3. Install dependencies

```console
make install-dependencies
```

> Note: Make sure docker desktop and docker compose are up and running otherwise the project will not run in local

# Usage

Once docker is up and running and you have installed dependencies run:

```console
make dev
```

Below you will find a table with the `make` commands you can use in the project
| Command | Description |
|----------------------|--------------------------------------------------------------|
| make dev | runs he project in development mode |
| make delete-docker | deletes all images, instances and containers in docker to have a fresh start |
| make install-dependencies | Install the dependencies of each microservice in the project |
| make gen-proto | Generates .pb files from all .proto files in the project |

# Recommended tools

To develop tis project I use vscode with several plugins to make it work properly

1. [VS Code](https://code.visualstudio.com/)
2. VScode extensions:

- Eslint
- Error lens
- Go
- Prettier
