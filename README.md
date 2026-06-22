# Becca

This workspace is split into a static frontend in `web/` and a Go backend in `backend/`.

## Structure

- `web/` contains the static HTML, CSS, JavaScript, images, fonts, and frontend licenses.
- `backend/` contains the Go module with `cmd`, `setup`, and focused `internal` packages.
- Root-level files such as this README and `Makefile` coordinate the full project.

## Run locally

Start the API:

```bash
make start
```

You can still run the underlying command directly if needed:

```bash
cd backend && go run ./cmd/api
```

The backend uses Gin for routing and GORM with PostgreSQL for persistence. It follows the same startup pattern as `ai-go`: `cfg.Default()` for env loading, `setup` for database/router wiring, controller registration, a repository-backed unit of work, and shared response helpers. On first start it auto-migrates and seeds the menu tables in the configured PostgreSQL database.

Use the environment variables in `backend/.env.template` to point the app at your local PostgreSQL instance. A root `.env` is still loaded when running through `make start`.

Then open `http://localhost:8080`. The frontend HTML, assets, and menu API are all served by the Go application.