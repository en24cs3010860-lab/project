# IMovies — cinema management & ticket booking

A JavaScript MERN monorepo starter with an Express REST API, MongoDB/Mongoose models, JWT authentication, movie discovery, admin-protected management routes, show-specific seat inventory, temporary seat reservations, and a responsive React/Vite interface.

> **Honest implementation status:** this repository establishes a runnable foundation and implements the core API/UI paths. Razorpay checkout, verified webhooks/refunds, complete admin CRUD screens, email delivery, ticket QR signing, and comprehensive E2E/concurrency testing still require completion/configuration before production use. The API never pretends an unconfigured payment succeeded.

## Prerequisites
- Node.js 20+
- MongoDB replica set or MongoDB Atlas (transactions are required for multi-seat reservation)

## Quick start
1. `npm install`
2. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_ACCESS_SECRET`, and `CLIENT_URL`.
3. Copy `client/.env.example` to `client/.env` if you need a non-default API URL.
4. Start MongoDB, then run `npm run dev` from the repository root.
5. API health: `http://localhost:5000/api/v1/health`; UI: `http://localhost:5173`.

The app will not create a default admin account. Create one securely by registering a user and promoting their role directly in a controlled database/admin setup procedure. Never expose this operation publicly.

## Commands
- `npm run dev` — client + server
- `npm run build` — production frontend build
- `npm test` — backend tests
- `npm run lint` — lint both workspaces

## Core API
- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`
- `GET /api/v1/movies`, `GET /api/v1/movies/featured`, `GET /api/v1/movies/:movieId`
- `GET /api/v1/theatres`, `GET /api/v1/shows`, `GET /api/v1/shows/:showId/seats`
- `POST /api/v1/shows/:showId/reservations`, `GET /api/v1/reservations/:reservationId`, `DELETE /api/v1/reservations/:reservationId`
- `GET /api/v1/bookings/my-bookings`, `GET /api/v1/bookings/:bookingId`
- Admin-only movie/theatre/show write routes are mounted under the corresponding resource paths.

Responses use `{ success, message, data }` with pagination metadata for lists. See `docs/API_DOCUMENTATION.md`.

## Reservation safety
Seat inventory is scoped to a show. Reservation requests are performed in a MongoDB transaction, reject the entire selection if all requested seats cannot be reserved, and use a reservation expiry. Socket.IO broadcasts changes after the transaction commits. Configure MongoDB as a replica set/Atlas for transactions. The database is authoritative; socket events are only UI updates.

## Payments
Razorpay environment variables are included for the next integration phase. Payment endpoints should only be enabled once server-side order creation, signature verification, raw-body webhook verification, event idempotency, and late-payment policy are implemented and tested. Missing credentials must not be treated as successful payment.

## Deployment checklist
- Use Atlas/replica-set MongoDB, TLS, strong unique secrets, HTTPS and secure cookies.
- Set exact production `CLIENT_URL` and CORS origins.
- Configure Razorpay keys and webhook secret on the server only.
- Configure Cloudinary/SMTP if enabled; do not commit secrets.
- Run tests/builds in CI and test concurrent reservation attempts against a replica set.
- Configure backups, monitoring, log redaction, and a durable background worker for reservation expiry.
