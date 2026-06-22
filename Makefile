.PHONY: start-api test-api dev-web build-web start-web

start-api:
	cd backend && go run ./cmd/api

test-api:
	cd backend && go test ./...

dev-web:
	cd web && npm run dev

build-web:
	cd web && npm run build

start-web:
	cd web && npm run start