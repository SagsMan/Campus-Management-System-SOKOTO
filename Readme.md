# Digital Queue System Sokoto

Digital Queue System Sokoto is a focused virtual queue service for student and
visitor-facing offices on Sokoto campuses. It replaces crowded physical lines
with simple, low-bandwidth queue access and live status updates.

## Product scope

The system keeps the modules needed to run campus service queues:

- Students and visitors can browse queues, join a queue, see their token and
  position, and receive status notifications.
- Operators can create and manage queues, call or skip tokens, pause service,
  change capacity, and open a public kiosk display.
- Administrators can manage operators and review queue performance reports.
- Public displays show only queue tokens and service status; they do not expose
  student names or contact details.

The initial campus office set is:

1. Registry
2. Bursary
3. Faculty Office
4. Departmental Office
5. Student Affairs

Operators may add another student service when a campus needs it.

## Nigerian campus requirements

- **Assisted registration:** service staff can help a student or visitor create
  an account or use a queue when the person has limited data access.
- **Low-bandwidth access:** queue listings are available without login, live
  updates use a small WebSocket payload, and wait-time estimates are computed
  locally without a separate ML service or external request.
- **Simple authentication:** the application uses email/password login with
  JWT sessions and email verification. It does not require a commercial
  identity provider.
- **Privacy-conscious records:** the account stores only the name, contact
  email, optional campus email/student ID, role, and queue history needed for
  service. Do not store medical, financial, address, or unrelated personal
  information in queue records.

## Main user flows

1. A student or visitor opens the public queue list and chooses the campus
   office they need.
2. They sign in or register, verify their email, and join an available queue.
3. The service shows their token, queue position, and current estimated wait.
4. An operator calls, skips, recalls, or marks tokens as no-shows from the
   operator console.
5. A kiosk or public display shows the active token without revealing student
   identity.

## Technology

- Frontend: Next.js, React, Tailwind CSS
- API: Node.js, Express, TypeScript
- Data: MongoDB
- Live updates: Socket.IO
- Queue state: Redis
- Authentication: bcrypt password hashing and JWT

## Repository layout

```text
frontend/  Next.js web application
backend/   Express API, authentication, queue and reporting modules
shared/    Shared queue and user types
docs/      API and architecture notes
infra/     Local infrastructure configuration
```

## Local development

### Prerequisites

- Node.js 20 or later
- MongoDB
- Redis

### Setup

```bash
cd backend
cp .env.example .env
npm ci

cd ../frontend
npm ci
```

Set the backend values in `backend/.env`, including the MongoDB, Redis,
JWT, and email settings. Set `NEXT_PUBLIC_API_URL` and
`NEXT_PUBLIC_SOCKET_URL` in `frontend/.env.local`.

### Run

Start the API and frontend in separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

For production checks:

```bash
cd backend && npm run build
cd ../frontend && npm run lint && npm run build
```

For API details, see `docs/api.md`. The public queue listing is available from
`GET /api/queues`; the office preset list is available from
`GET /api/queues/campus-offices`.