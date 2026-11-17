# CampusPulse

CampusPulse is a full-stack campus issue and resource coordination platform built to demonstrate Modules 3–5: MongoDB, Express/Node.js, Angular and React.

## Architecture
- **MongoDB + Mongoose:** flexible issue, user, resource and activity collections.
- **Node.js + Express:** REST API, validation, JWT authentication and role-based authorization.
- **Socket.IO:** real-time issue creation/status notifications.
- **React + Vite:** student-facing reporting and issue tracking portal.
- **Angular + TypeScript:** staff/admin operations dashboard starter.
- **Docker Compose:** local MongoDB environment.

## Run locally
1. Install Node.js 20+ and Docker Desktop/Engine.
2. Copy `server/.env.example` to `server/.env` and set a strong `JWT_SECRET`.
3. From the project root run `docker compose up -d`.
4. In `server`: `npm install && npm run seed && npm run dev`.
5. In `client-react`: `npm install && npm run dev`.
6. Open the Vite URL (normally http://localhost:5173).

The API runs at http://localhost:5000. Health check: `/api/health`.

## Demo accounts
Seed script creates:
- admin@campuspulse.demo / CampusPulse@123
- staff@campuspulse.demo / CampusPulse@123
- student@campuspulse.demo / CampusPulse@123

Change these credentials immediately outside a local demo. Never deploy with demo credentials.

## API overview
- `POST /api/auth/register` – create student account
- `POST /api/auth/login` – issue JWT
- `GET /api/issues` – list issues (authenticated)
- `POST /api/issues` – report issue (authenticated)
- `PATCH /api/issues/:id/status` – staff/admin status update
- `GET /api/resources` – list campus resources
- `POST /api/resources` – create/update resource (staff/admin)
- `GET /api/analytics/summary` – admin/staff metrics

## Security notes
Passwords are hashed with bcrypt; JWTs are verified by middleware; privileged routes use role checks; request bodies are validated; CORS is configurable. For production add HTTPS, rate limiting, audit retention, refresh-token rotation, centralized logging and managed secrets.
