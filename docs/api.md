# Digital Queue System Sokoto API

All API routes are mounted below `/api`.

## Public queue access

- `GET /queues` returns queue names, locations, capacity, current waiting
  count, and an estimated wait. It does not return student names or contact
  details.
- `GET /queues/campus-offices` returns the Sokoto campus office presets:
  Registry, Bursary, Faculty Office, Departmental Office, and Student Affairs.
- `GET /queues/:queueId/predicted-wait` returns a local estimate based on the
  current queue, so it does not depend on the removed ML service.
- `GET /health` is available outside the `/api` prefix for service checks.

## Authenticated queue access

Send `Authorization: Bearer <jwt>` for these routes:

- `POST /auth/register` creates a student, visitor, operator, or admin account
  using the fields needed for queue access.
- `POST /auth/login` returns a JWT after email verification.
- `POST /user-status/join-queue` joins the authenticated account to one queue.
- `GET /user-status/current-queue` returns the account's active token and
  position.
- `POST /queues/:queueId/tokens` is the lower-level queue token endpoint.

## Operator and administrator access

Operators and administrators can create and manage queues, change capacity,
serve or skip tokens, and access the live queue view. Administrators can also
access reporting routes under `/admin`, including:

- `/admin/dashboard/summary`
- `/admin/analytics/queue-load`
- `/admin/analytics/tokens-served`
- `/admin/analytics/avg-wait-time`
- `/admin/analytics/token-status`

## Privacy and assisted registration

Queue and kiosk responses use token numbers only. Staff-assisted registration
should collect only the minimum information required for the visit. Do not put
medical, financial, address, or other unrelated sensitive information in a
queue name, location, token, or note.
