# Deployment checklist

1. Provision MongoDB Atlas or a replica set and restrict network access.
2. Set production environment values; generate a random JWT secret of at least 32 characters.
3. Serve behind HTTPS; set `COOKIE_SECURE=true`, choose an appropriate SameSite policy, and set the exact frontend origin in `CLIENT_URL`.
4. Configure Razorpay credentials only on the server after implementing and testing signature/webhook verification.
5. Configure logs/monitoring, backups, and reservation expiry processing.
6. Build the client with `npm run build`; deploy `client/dist` to static hosting and run the API on a Node host.
7. Run smoke tests and a concurrency test against the actual replica-set configuration before accepting bookings.

The present starter is not yet production-certified. Payment settlement/refunds, hardened socket authorization, complete admin workflows, and operational background jobs must be finished and tested before production launch.
