# Becca

This workspace is now served entirely from the Go backend project.

## Structure

- The repo root mirrors the `ai-go` project shape with `cmd`, `setup`, focused `internal` packages, and `www/` for the merged frontend HTML and static assets.

## Run locally

Start the API:

```bash
go run ./cmd/api
```

The backend uses Gin for routing and GORM with PostgreSQL for persistence. It follows the same startup pattern as `ai-go`: `cfg.Default()` for env loading, `setup` for database/router wiring, controller registration, a repository-backed unit of work, and shared response helpers. On first start it auto-migrates and seeds the menu tables in the configured PostgreSQL database.

Use the environment variables in `.env.template` to point the app at your local PostgreSQL instance.

Then open `http://localhost:8080`. The frontend HTML, assets, and menu API are all served by the Go application.