# Becca

This workspace is split into separate frontend and backend projects.

## Structure

- `frontend/` contains the static site assets and HTML.
- `backend/` mirrors the `ai-go` project shape with `cmd`, `setup`, and focused `internal` packages for config, controllers, DTOs, middleware, repositories, services, and types.

## Run locally

Start the API:

```bash
cd backend
go run ./cmd/api
```

The backend uses Gin for routing and GORM with PostgreSQL for persistence. It follows the same startup pattern as `ai-go`: `cfg.Default()` for env loading, `setup` for database/router wiring, controller registration, a repository-backed unit of work, and shared response helpers. On first start it auto-migrates and seeds the menu tables in the configured PostgreSQL database.

Use the environment variables in `backend/.env.template` to point the app at your local PostgreSQL instance.

Serve the frontend from a separate terminal:

```bash
cd frontend
python3 -m http.server 4173
```

Then open `http://localhost:4173`. The frontend fetches menu data from `http://localhost:8080/api/menu` by default.