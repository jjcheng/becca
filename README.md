# Becca

This workspace is split into a React/Next.js frontend in `web/` and a Go backend in `backend/`.

## Structure

- `web/` contains the Next.js app, legacy static HTML pages, shared CSS, images, fonts, and frontend licenses. Public assets live under `web/public/`.
- `backend/` contains the Go module with `cmd`, `setup`, and focused `internal` packages.
- Root-level files such as this README and `Makefile` coordinate the full project.

## Run locally

Start the Next.js frontend:

```bash
cd web && npm install
make web-dev
```

Then open `http://localhost:3000`.

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

Then open `http://localhost:8080`. The Go application still serves the legacy static HTML pages and shared public assets, while the React/Next.js app runs from `web/` during frontend development.