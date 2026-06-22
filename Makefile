.PHONY: start test

start:
	cd backend && go run ./cmd/api

test:
	cd backend && go test ./...