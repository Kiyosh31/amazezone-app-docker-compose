dev:
	docker compose up --build

delete-docker:
	docker system prune --all --force

install-dependencies:
	chmod +x install-dependencies.sh
	./install-dependencies.sh