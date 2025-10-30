<!--
  Professional README for the FoodShare project
  Generated/updated by an automated assistant. Edit sections marked TODO where you want
  project-specific or sensitive information (licenses, production deploy keys, etc.).
-->

# FoodShare

FoodShare is a real-time food donation web platform that connects donors (restaurants, individuals, NGOs) with recipients in need. It uses live location data and notifications to make distribution efficient and safe.

This README provides a developer-oriented setup guide, environment details, running instructions, and helpful troubleshooting tips.

## Contents

- [FoodShare](#foodshare)
  - [Contents](#contents)
  - [Demo / Purpose](#demo--purpose)
  - [Tech stack](#tech-stack)
  - [Repository structure (key files)](#repository-structure-key-files)
  - [Prerequisites](#prerequisites)
  - [Local setup (quick)](#local-setup-quick)
  - [Environment variables](#environment-variables)
  - [Run instructions (dev)](#run-instructions-dev)
  - [Testing SMTP (email)](#testing-smtp-email)
  - [Troubleshooting](#troubleshooting)
  - [Developer notes \& recent changes](#developer-notes--recent-changes)
  - [Security notes](#security-notes)
  - [Suggested next steps](#suggested-next-steps)
- [React + Vite](#react--vite)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)

## Demo / Purpose

FoodShare helps rescue surplus food and deliver it to people who need it. Donors post available food with quantity and location, and claimers can request pickup. The platform aims to reduce food waste and fight hunger.

## Tech stack

- Frontend: React (Vite), Redux, Lucide icons
- Backend: Node.js, Express
- Database: MongoDB (mongoose)
- Auth: JWT
- Email: Nodemailer (SMTP) — recommended to use transactional provider in production (SendGrid / Mailgun / SES)
- Maps: Google Maps API

## Repository structure (key files)

Top-level folders:

- `Frontend/` — React app (Vite). Entry: `src/main.jsx` and `index.html`.
- `Backend/` — Express server. Entry: `server.js`.

Important files you might edit:

- `Backend/config/db.js` — MongoDB connection logic
- `Backend/.env.example` — example environment values (keep secrets out of repo)
- `Backend/test-smtp.js` — small script to verify SMTP credentials locally
- `Frontend/src/styles/theme.css` — central theme tokens and utilities
- `Frontend/src/components/UI/Card.jsx` — shared Card component used across pages

## Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn)
- MongoDB instance (Atlas or local)
- Google Cloud project with Maps API key (if you need maps)

## Local setup (quick)

1. Clone the repository:

```bash
git clone <your-repo-url>
cd FoodShare
```

2. Backend (install & env):

```bash
cd Backend
npm install
cp .env.example .env    # then edit .env with your values
```

3. Frontend (install):

```bash
cd ../Frontend
npm install
```

## Environment variables

Create `Backend/.env` from `Backend/.env.example` and set the real values. The important keys are:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secure random string for JWT signing
- `GOOGLE_MAPS_API_KEY` — Google Maps API key (used by frontend)
- `EMAIL_USER` — SMTP username or email-sender (for Nodemailer)
- `EMAIL_PASS` — SMTP password or app-password / API key (do NOT commit)
- `PORT` — backend server port (default 5000)
- `ALLOWED_ORIGINS` — optional comma-separated origins allowed by the backend CORS policy

Frontend environment (Vite) variables should be prefixed with `VITE_` and placed in `.env` at the project root of the Frontend or set in your shell:

- `VITE_REACT_APP_GOOGLE_API` — Google Maps API key for browser
- `VITE_REACT_APP_API` — Base URL of the backend API (e.g. `http://localhost:5000`)

## Run instructions (dev)

Start the backend:

```bash
cd Backend
# start with Node
node server.js

# or use nodemon (recommended for dev):
# npm i -g nodemon
nodemon server.js
```

Start the frontend (Vite):

```bash
cd Frontend
npm run dev
```

By default:
- Backend: http://localhost:5000
- Frontend (Vite): usually http://localhost:5173

If you use cookies or credentials across domains, ensure the backend `ALLOWED_ORIGINS` includes your frontend origin (e.g. `http://localhost:5173`).

## Testing SMTP (email)

If you use Gmail, Google commonly rejects simple username/password SMTP connections. Use an App Password (recommended) or an external provider.

Quick local SMTP verification (from `Backend`):

```bash
# ensure Backend/.env has EMAIL_USER and EMAIL_PASS set
node test-smtp.js
```

If you get `EAUTH` / `535 Bad credentials`, create a Gmail App Password or switch to SendGrid/Mailgun.

## Troubleshooting

- CORS errors: ensure `ALLOWED_ORIGINS` in `Backend/.env` contains the frontend origin. Also restart the backend after changes.
- MongoDB connection failed: check `MONGO_URI` and network/Atlas IP whitelist.
- SMTP auth error (`EAUTH`): use app passwords or provider API key. See Testing SMTP above.
- `ReferenceError: module is not defined` in Vite: caused by CommonJS code in frontend files. Convert to ES modules (`export default ...`) — example: `src/components/FAQ.jsx` was updated.

## Developer notes & recent changes

I made UI improvements and added a small theme system and reusable components for a cleaner, modern look (useful files):

- `Frontend/src/styles/theme.css` — theme variables and utilities
- `Frontend/src/components/UI/Card.jsx` — small reusable Card
- Updated components:
  - `Frontend/src/components/Navbar.jsx`
  - `Frontend/src/components/Hero.jsx`
  - `Frontend/src/components/Footer.jsx`
  - `Frontend/src/page/AvailableFood.jsx`
  - `Frontend/src/page/Donate.jsx`
  - `Frontend/src/components/FAQ.jsx` (fixed to be an ES module component)

Backend improvements made during recent work:

- `server.js` — CORS now supports an `ALLOWED_ORIGINS` env var and includes localhost for dev.
- `Backend/test-smtp.js` — helper script to verify SMTP credentials.

## Security notes

- Never commit `Backend/.env` or other secret files. `.gitignore` includes `.env` but double-check before pushing.
- Rotate credentials immediately if they were committed to a public repo (DB user password, Google API key, email password).

## Suggested next steps

- Replace Nodemailer + Gmail with a transactional provider (SendGrid / Mailgun) for production reliability.
- Add automated tests (Jest / supertest) for backend routes.
- Add CI (GitHub Actions) to run linting and tests on PRs.
- Create a `LICENSE` file and choose a license for the repository (MIT is common for open-source).

---

If you'd like, I can:

- Add a `LICENSE` file (MIT) and update package.json
- Create a `DEVELOPMENT.md` with more detailed contributor setup
- Convert the entire UI to a design system (Tailwind config or CSS variables) and restyle all pages consistently

Tell me which follow-ups you want and I will apply them.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
