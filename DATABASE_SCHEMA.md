# Database schema

- `User`: normalized unique email, bcrypt password hash excluded from normal queries, USER/ADMIN role.
- `Movie`: title/slug, media URLs, genres/languages, duration, release date, status, featured flag; text and status/date indexes.
- `Theatre`: address and city; active flag.
- `Screen`: theatre reference and seat layout (`seatNumber`, row, category, aisle marker).
- `Show`: movie/theatre/screen references, UTC start/end timestamps, pricing by seat category; schedule indexes.
- `SeatInventory`: one document per seat per show; unique `{showId, seatNumber}` index and status/reservation expiry.
- `Reservation`: owner, show, seat numbers, expiry and lifecycle status.
- `Booking`: owner, references, price breakdown and lifecycle/payment statuses. Payment finalization is not yet wired to a provider in this foundation.

MongoDB transactions require a replica set or compatible managed cluster. Keep inventory per show; never model seat availability as a property of the screen itself.
