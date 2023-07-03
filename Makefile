dev:
	docker compose up --build

delete-docker:
	docker system prune --all --force

install-dependencies:
	./install-dependencies.sh

gen-proto:
	./gen-protos.sh