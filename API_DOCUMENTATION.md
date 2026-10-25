# API documentation (foundation)
Base URL: `/api/v1`. JSON errors contain `success:false`, `message`, `code`, and `requestId`.

## Public endpoints
- `GET /health` — service health.
- `GET /movies?search=&genre=&language=&status=&sort=&page=1&limit=12` — paginated movie listing.
- `GET /movies/featured` — featured now-showing movies.
- `GET /movies/:movieId` — movie detail.
- `GET /theatres?city=&page=1&limit=10` — active theatres.
- `GET /theatres/:theatreId/screens` — active screens.
- `GET /shows?movieId=&theatreId=&date=YYYY-MM-DD` — future scheduled shows.
- `GET /shows/:showId/seats` — show-specific inventory.

## Authentication
- `POST /auth/register` `{name,email,password}`; password must be at least 10 characters.
- `POST /auth/login` `{email,password}`.
- `POST /auth/logout` clears the HTTP-only cookie.
- `GET /auth/me` returns the current user.

## Reservations (authenticated)
- `POST /shows/:showId/reservations` `{seatNumbers:["A1","A2"]}`. Maximum 10 seats; temporary reservation is five minutes.
- `GET /reservations/:reservationId`
- `DELETE /reservations/:reservationId`

## Bookings (authenticated)
- `GET /bookings/my-bookings`
- `GET /bookings/:bookingId` (owner only)

## Admin-protected write endpoints
- `POST /movies`, `PATCH /movies/:movieId`, `DELETE /movies/:movieId` (delete archives).
- `POST /theatres`, `PATCH /theatres/:theatreId`.
- `POST /shows` creates a show and per-show seat inventory after checking screen schedule overlap.

Admin role must be assigned via a restricted operational process. Never accept a role from public registration payloads.

## Socket.IO
Clients may emit `joinShowRoom` with `{showId}` and `leaveShowRoom` with `{showId}`. Server broadcasts `seatAvailabilityUpdated` after successful reservation commits. In this foundation, room joining validates ID shape only; production deployments should also verify show access and apply connection-level authentication/limits.
