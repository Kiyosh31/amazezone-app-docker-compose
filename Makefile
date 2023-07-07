dev:
	docker compose up --build

delete-docker:
	docker system prune --all --force

install-dependencies:
	./install-dependencies.sh

proto:
	./gen-protos.sh