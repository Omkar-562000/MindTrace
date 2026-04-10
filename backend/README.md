# MindTrace Backend

Minimal hackathon-ready backend for MindTrace using Node.js, Express, TypeScript, SQLite, JWT, and Zod.

## Run

1. Open a terminal in `backend/`
2. Install dependencies:
   `npm install`
3. Start in development:
   `npm run dev`

The API runs on `http://localhost:4000` by default.

## Optional Environment Variables

- `PORT=4000`
- `JWT_SECRET=mindtrace-demo-secret`

If `JWT_SECRET` is not set, the backend uses a local demo secret for hackathon use.

## API Summary

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /checkin`
- `GET /checkin/history`
- `POST /analyze`
- `GET /study-plan`
