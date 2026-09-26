# Datastraw Support CRM

A full-stack customer support ticketing system built for the Datastraw Technologies
assessment. Agents can create tickets, search/filter them, and view/update status
and notes on each one.

**Stack:** Node.js + Express (API) · MongoDB + Mongoose (DB) · React + Vite (frontend)

---

## Project Structure

```
datastraw-crm/
├── backend/          # Express API + MongoDB models
│   ├── config/        # DB connection
│   ├── controllers/    # Route handler logic
│   ├── models/         # Mongoose schemas (Ticket, Counter)
│   ├── routes/          # Express routers
│   ├── .env.example
│   └── server.js
└── frontend/          # React (Vite) client
    ├── src/
    │   ├── pages/        # Home, NewTicket, TicketDetail
    │   ├── components/    # Reusable UI pieces
    │   └── api.js          # Fetch wrapper for the backend
    └── .env.example
```

## Data Model

**Ticket** (single collection; notes are embedded rather than a separate
collection/table — see "Design Notes" below)

| Field          | Type                                |
|----------------|--------------------------------------|
| ticketId       | String, unique, auto-generated (`TKT-001`) |
| customerName   | String                              |
| customerEmail  | String                              |
| subject        | String                              |
| description    | String                              |
| status         | `Open` \| `In Progress` \| `Closed` |
| notes          | Array of `{ text, createdAt }`      |
| createdAt / updatedAt | Timestamps (auto)            |

## API Endpoints

| Method | Endpoint                | Description                                   |
|--------|--------------------------|------------------------------------------------|
| POST   | `/api/tickets`            | Create a ticket                                |
| GET    | `/api/tickets`            | List tickets — `?status=` and `?search=` optional |
| GET    | `/api/tickets/:ticketId`  | Get full ticket detail incl. notes            |
| PUT    | `/api/tickets/:ticketId`  | Update `status` and/or append a `notes` entry |

## Local Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI to your MongoDB connection string
npm run dev
```

The API runs on `http://localhost:5000` by default.

You'll need a MongoDB connection string. The free tier of
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) works well — create a
cluster, add a database user, whitelist your IP (or `0.0.0.0/0` for simplicity),
and copy the connection string into `MONGO_URI`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# edit .env and set VITE_API_URL to your backend URL
npm run dev
```

The app runs on `http://localhost:5173` by default.

## Deployment

- **Backend:** Deploy `backend/` to Render or Railway. Set `MONGO_URI`,
  `PORT` (usually set automatically), and `CLIENT_ORIGIN` (your deployed
  frontend URL) as environment variables.
- **Frontend:** Deploy `frontend/` to Vercel or Render (static site / Vite
  build). Set `VITE_API_URL` to your deployed backend URL.
- **Database:** MongoDB Atlas free tier.

## Design Notes / Tradeoffs

- **Embedded notes instead of a separate collection.** Notes are always read
  and written in the context of a single ticket, and a ticket won't have more
  than a handful of them — so embedding avoids an extra query/join on every
  detail-page load. Tradeoff: this wouldn't scale if notes needed to be
  queried independently (e.g. "show me all notes mentioning X across every
  ticket") — at that point I'd split them into their own collection.
- **Sequential ticket IDs via a counter document** rather than
  `countDocuments() + 1`, so IDs stay correct even if a ticket is deleted or
  two tickets are created at the same moment.
- **Search** does a case-insensitive partial match (`$or` with regex) across
  name, email, ticket ID, subject, and description, debounced 300ms on the
  frontend — this is what makes "search as you type" feel responsive without
  hammering the API on every keystroke.

## What I'd Add With More Time

- Pagination on the ticket list (matters once volume gets into the hundreds)
- Basic auth for agents
- Email notification to the customer when status changes
- Priority field / SLA tracking
