.PHONY: start test web-dev web-build web-start

start:
	cd backend && go run ./cmd/api

test:
	cd backend && go test ./...

web-dev:
	cd web && npm run dev

web-build:
	cd web && npm run build

start-web:
	cd web && npm run start