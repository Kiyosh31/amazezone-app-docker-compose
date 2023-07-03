dev:
	docker compose up --build

install-dependencies:
	./install-dependencies.sh

gen-proto:
	./gen-protos.sh