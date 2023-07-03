# Introduction

This is a personal project made to understand and create a microservices architecture from scratch, I will continue adding features, info and diagrams as I keep working on this

# instructions

## Pre-requisites

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Docker Compose](https://docs.docker.com/compose/)
3. Being able to run Makefiles

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
