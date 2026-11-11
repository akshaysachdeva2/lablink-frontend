# LabLink Frontend

React + TypeScript + Vite frontend for the LabLink diagnostic test comparison and booking application.

## Requirements

- Node.js 20 or newer
- npm
- LabLink backend running at `http://localhost:5001`
- PostgreSQL database seeded using the backend project's SQL files

## Setup

1. Open this `lablink-typescript` folder in VS Code.
2. Open the integrated terminal in this folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. The included `.env` is configured for the backend port used in this project:

   ```env
   VITE_API_BASE_URL=http://localhost:5001/api
   ```

   If needed, copy `.env.example` to `.env` and use the same value.

5. Start the frontend:

   ```bash
   npm run dev
   ```

6. Open the Vite URL, normally `http://localhost:5173`.

## Run both applications

Keep the backend and frontend running in separate terminals:

**Backend terminal** (inside `lablink-backend`):

```bash
npm run dev
```

**Frontend terminal** (inside `lablink-typescript`):

```bash
npm run dev
```

The frontend talks directly to `http://localhost:5001/api`. The backend's CORS configuration already allows the Vite development URL `http://localhost:5173`.

## Features connected to the backend

- Live diagnostic test catalog and search
- Test detail pages with lab-wise prices and availability
- User registration and login (JWT token stored in browser local storage)
- Authenticated test bookings
- Authenticated booking history

The database seed data currently contains six demonstration tests and six demonstration partner labs. These are sample records, not endorsements of real diagnostic providers.

## Build check

```bash
npm run build
```

## Troubleshooting

- If the browser reports that the API cannot be reached, confirm the backend terminal says it is running on port `5001` and open `http://localhost:5001/api/health`.
- If you change `.env`, stop and restart the Vite development server.
- If packages are missing, run `npm install` again from this frontend folder.
