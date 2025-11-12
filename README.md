# FoodShare

FoodShare is a real-time food donation platform that connects donors (individuals, restaurants, or NGOs) with volunteers who pick up and deliver donations to people in need. The app includes realtime notifications (Socket.IO), JWT authentication, and a small volunteer workflow (accept, pickup, in-transit, delivered).

This README is tailored for developers working locally: how to run, what environment variables are required, and common troubleshooting steps.

## Quick links

- Frontend: `Frontend/` (React + Vite)
- Backend: `Backend/` (Express + Mongoose + Socket.IO)

## What’s included (high level)

- Realtime notifications using Socket.IO (server: `Backend/server.js`, client: `Frontend/src/components/VolunteerNotifications.jsx`).
- Role-based users (`User.role` includes `user`, `donor`, `volunteer`, `admin`).
- Atomic claim flow for donations (first volunteer to claim wins) in `Backend/controllers/foodController.js`.
- Persisted recent notifications with TTL (so volunteers reconnecting can fetch missed alerts).

## Key features

The project implements the following key features (detailed):

- Realtime notifications (Socket.IO)
  - Backend emits `new_donation` when a donor posts a donation; volunteers connected via Socket.IO receive the event immediately.
  - Persisted `Notification` documents (TTL, ~24h) allow the server to re-send `missed_notifications` on reconnect for donations that still exist.
  - Socket events used by the app: `new_donation`, `donation_claimed`, `status_update`, `missed_notifications`.
  - Server-side socket file: `Backend/server.js`. Client-side entry: `Frontend/src/components/VolunteerNotifications.jsx`.

- Volunteer workflow & role-aware UI
  - Users have roles (`user`, `donor`, `volunteer`, `admin`) stored in the JWT. The frontend gates UI and routes based on this claim.
  - Volunteer-specific UX: a notification bell with unread badge, a volunteer dashboard, a tasks list, and an in-app notification panel for live claims.
  - Files: `Frontend/src/page/VolunteerDashboard.jsx`, `Frontend/src/page/VolunteerTasks.jsx`, `Frontend/src/components/VolunteerNotifications.jsx`, and `Frontend/src/components/Navbar.jsx`.

- Atomic claim flow (first-come wins)
  - Claims are processed atomically server-side (find-and-update or equivalent) in `Backend/controllers/foodController.js` so only one volunteer can claim a donation.
  - On success: a `ClaimedFood` document is created, the original `Food` (donation) is removed, related `Notification` docs are cleaned up, and `donation_claimed` is emitted to other volunteers.

- Pickup & delivery lifecycle updates
  - Volunteers update statuses (PickedUp, InTransit, Delivered) using `PUT /api/food/claimed/:id/status`. The server persists the status and emits `status_update` events to interested clients.

- Geolocation, maps and distance UX
  - Frontend uses browser geolocation and a Haversine formula to estimate distance between volunteer and donor (see `VolunteerTasks.jsx`).
  - `AvailableFood.jsx` contains an optional Google Map (via `@react-google-maps/api`) with markers and an InfoWindow showing donor name, address, contact, and an inline Claim button.
  - Volunteers can open directions in Google Maps via a "View on Map" link that constructs a directions URL using volunteer coordinates and donor coordinates.

- Notification resilience & UI sync
  - Persisted notifications (TTL) + server-side filtering prevent re-sending alerts for donations that are no longer available.
  - Frontend syncs an unread count in `sessionStorage.fs_notifications_count` and dispatches a custom event to update the bell badge across tabs.

- Socket rooms & handshake behavior
  - On connect the server joins sockets to rooms like `volunteer:<id>` and `area:<areaKey>`; this is used to deliver targeted events.
  - The socket handshake attempts JWT verification (token must include `role`) — this is in `Backend/server.js`. (Note: further hardening is recommended to actively reject unauthenticated sockets.)

- Dev conveniences, CORS & env checks
  - CORS: middleware allows common localhost variants during development and supports `ALLOWED_ORIGINS` in `Backend/.env`.
  - Early env validation in `Backend/server.js` provides clear startup failures when `MONGO_URI` or `JWT_SECRET` are missing.

- SMTP & email helper
  - `Backend/test-smtp.js` is included to help debug email issues. Gmail often requires an App Password or a transactional provider (SendGrid, Mailgun, SES) for production.

- File uploads & image handling
  - Upload middleware handles donor image uploads (`Backend/middleware/uploadMiddleware.js` + `Backend/uploads/`).
  - For demo purposes the frontend was updated to force food cards to use a single Unsplash image URL (this was requested to standardize visuals). If you prefer real uploaded images, `AvailableFood.jsx` includes `resolveImageUrl()` logic to map relative `/uploads` paths to the backend base URL.

- Backend & Frontend stacks (quick)
  - Backend: Node.js + Express + Mongoose (MongoDB) + Socket.IO + Nodemailer. Key files: `Backend/server.js`, `controllers/foodController.js`, `models/Food.js`, `models/Notification.js`.
  - Frontend: React (Vite) + Redux for auth, axios, `@react-google-maps/api`, react-toastify. Key files: `Frontend/src/page/AvailableFood.jsx`, `Frontend/src/components/VolunteerNotifications.jsx`, `Frontend/src/components/Navbar.jsx`.

- REST endpoints & socket contract (summary)
  - REST: `POST /api/food/add`, `GET /api/food/available`, `POST /api/food/claim/:id`, `PUT /api/food/claimed/:id/status`, plus auth/profile routes.
  - Socket events: `new_donation`, `donation_claimed`, `status_update`, `missed_notifications`.

Planned/near-term improvements (not yet fully implemented):

- Geofencing / spatial targeting: replace the crude `area:` room logic with geohash or MongoDB geospatial queries to deliver notifications only to nearby volunteers.
- Per-user read/unread state for notifications, to avoid re-showing dismissed items after reconnect.
- Hardened Socket.IO handshake rejection of unauthenticated sockets and role enforcement at connect time.


## Prerequisites

- Node.js v18+ (recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Optional: Google Maps API key (for location UI)

## Environment variables

Create `Backend/.env` (do NOT commit it). Important variables:

- MONGO_URI (required) — e.g. mongodb://localhost:27017/foodshare
- JWT_SECRET (required) — a long random string for signing JWTs
- PORT — backend port (default 5000)
- EMAIL_USER / EMAIL_PASS — SMTP credentials for Nodemailer (optional)
- ALLOWED_ORIGINS — optional comma separated origins for CORS (dev includes localhost by default)

Frontend (Vite) variables live in `Frontend/.env` (or your shell) and must be prefixed with `VITE_`:

- VITE_REACT_APP_API — backend base URL (e.g. http://localhost:5000)
- VITE_REACT_APP_GOOGLE_API — Google Maps browser key (optional)

Note: Some project scripts may sanitize quotes around Vite values; avoid wrapping values in quotes.

## Install & run (local development)

1) Backend

```bash
cd Backend
npm install
# create a Backend/.env using Backend/.env.example and fill values
npm start
```

If you prefer autoreload during development, install `nodemon` globally and run `nodemon server.js`.

2) Frontend

```bash
cd Frontend
npm install
npm run dev
```

Default ports used during development:
- Frontend (Vite): http://localhost:5173
- Backend (API & Socket.IO): http://localhost:5000

If your frontend cannot connect to Socket.IO (ws://localhost:5000), make sure the backend is running and not crashing on startup. See Troubleshooting below.

## Developer workflows worth knowing

- Real-time flow: when a donor posts a donation (`POST /api/food/add`), backend persists the Food and a `Notification` doc (TTL 24h) and emits a `new_donation` event via Socket.IO. Volunteers connected to Socket.IO receive the event live.
- Claiming: volunteers hit `POST /api/food/claim/:id` (authenticated). The backend performs an atomic find-and-update to ensure only one volunteer can claim a donation. On success it creates a `ClaimedFood` document and emits `donation_claimed` to remove the alert from other volunteers.
- Status updates: volunteers update pickup/delivery status with `PUT /api/food/claimed/:id/status` which emits `status_update` events.

## Important files & routes

- Backend
  - `server.js` — app bootstrap, CORS config, Socket.IO setup
  - `controllers/foodController.js` — addFood, claimFood, updateClaimedStatus
  - `models/Notification.js` — persisted notifications with TTL
  - `routes/foodRoutes.js` — REST endpoints under `/api/food`

- Frontend
  - `src/components/VolunteerNotifications.jsx` — realtime client + notification panel
  - `src/page/VolunteerDashboard.jsx` — volunteer dashboard
  - `src/page/VolunteerTasks.jsx` — volunteer task list and status updates
  - `src/components/Navbar.jsx` — shows volunteer bell badge and role-aware links

## Testing SMTP

If you rely on email (password resets, notifications), test SMTP locally using `Backend/test-smtp.js`. Gmail commonly returns EAUTH/535 unless you use an App Password or a transactional provider (SendGrid, Mailgun, SES). For production use a provider — do not rely on plain Gmail credentials.

## Troubleshooting

- Socket.IO connection errors (browser shows ws://... interrupted):
  1. Confirm backend is running (`npm start` in Backend) and listening on the expected port.
 2. Check backend logs for startup errors (missing env vars, DB connection failure). We added an early env check in `server.js` that will exit with a helpful message if `MONGO_URI` or `JWT_SECRET` is missing.
 3. Ensure frontend `VITE_REACT_APP_API` points to the backend base URL and that the Socket.IO client is using the same origin.

- Backend exit code 1 on start: inspect console — common causes: missing `MONGO_URI`, DB connection failure, or port already in use.

- CORS errors: set `ALLOWED_ORIGINS` in `Backend/.env` (comma-separated) to include your frontend origin (e.g. http://localhost:5173). The server allows localhost variants by default in development.

- SMTP EAUTH 535: use an App Password for Gmail or a transactional email provider.

## Quick verification checklist

1. Start MongoDB (or ensure Atlas is accessible).
2. Start backend: `cd Backend && npm start`. Confirm `Server running on port` message.
3. Start frontend: `cd Frontend && npm run dev`.
4. Open the app, sign up as a donor and create a donation. Open another browser/session as a volunteer and verify the notification appears and can be claimed.

## Recommended next steps / improvements

- Harden Socket.IO authentication: currently the server accepts connections and tries to verify the handshake token but does not fully enforce role-based disconnects — consider rejecting unauthenticated sockets during handshake.
- Geofencing: replace crude `area:` room logic with geohash or spatial queries (MongoDB geospatial index) to deliver notifications only to nearby volunteers.
- Per-volunteer read/unread: store a per-user read state for Notifications so missed items are not re-shown after a volunteer has already dismissed them.
- Tests: add unit/integration tests for critical endpoints (claim flow, status updates).

## Contributing

If you want me to apply changes (theme, accessibility pass, geofencing support, or tests), tell me which area to prioritize and I will create focused patches.
