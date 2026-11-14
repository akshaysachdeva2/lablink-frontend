# LabLink — Diagnostic Test Comparison & Booking Platform

LabLink is a full-stack web application for exploring diagnostic tests, comparing prices across laboratories, and booking appointments. It brings test discovery, lab-wise pricing, booking management, and AI-assisted report summaries into one interface.

**Live application:** https://lablink-frontend-lime.vercel.app/  
**Backend API:** https://lablink-backend-cp9v.onrender.com/api  
**Backend health check:** https://lablink-backend-cp9v.onrender.com/api/health

> **Demo-data notice:** Laboratory listings, prices, and availability in the seeded database are demonstration data. They are not live quotes or verified listings from real diagnostic providers.

## Features

- **Diagnostic test discovery:** Browse and search the available diagnostic test catalogue.
- **Lab-wise price comparison:** Compare listed prices and availability for a test across laboratories.
- **Test details:** View information about a selected test and its laboratory options.
- **Account authentication:** Register and sign in to access account-specific booking features.
- **Appointment booking:** Select a laboratory, collection mode, date, and time slot, then submit a booking.
- **Home collection support:** Choose home collection when the selected laboratory supports it; otherwise use lab visit.
- **Booking history:** View bookings associated with the signed-in account.
- **Booking cancellation:** Cancel an existing booking through the booking interface.
- **AI report summary:** Upload a PDF, JPG, or PNG medical report and request an AI-generated explanation. The feature requires sign-in and explicit consent before the file is submitted. The summary is educational and is not a medical diagnosis.
- **Protected user flows:** Booking and report-summary actions require authentication.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Routing | React Router |
| UI icons | Lucide React |
| API communication | Axios |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| AI integration | Google Gemini API |

## Repositories

- **Frontend:** https://github.com/akshaysachdeva2/lablink-frontend
- **Backend:** https://github.com/akshaysachdeva2/lablink-backend-

## Run Locally

The frontend and backend run in separate terminals.

### Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL
- Git

### 1. Clone the repositories

Frontend:

```bash
git clone https://github.com/akshaysachdeva2/lablink-frontend.git
cd lablink-frontend
npm install
```

Backend setup is documented in the [backend README](https://github.com/akshaysachdeva2/lablink-backend-#readme).

### 2. Configure the frontend

Create a `.env` file in the frontend project root:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

For production, the deployed frontend is configured to use the deployed backend API. Do not commit private credentials or secret values.

### 3. Start the frontend

From the frontend directory:

```bash
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

### 4. Start the backend

In a separate terminal, start the backend by following its setup instructions, then run:

```bash
npm run dev
```

The local API is expected at `http://localhost:5001/api`.

## Useful Commands

Frontend:

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run TypeScript project builds and create the production bundle |
| `npm run preview` | Preview the production build locally |

## Application URLs

| Service | URL |
|---|---|
| Production frontend | https://lablink-frontend-lime.vercel.app/ |
| Production API | https://lablink-backend-cp9v.onrender.com/api |
| API health check | https://lablink-backend-cp9v.onrender.com/api/health |
| Local frontend | http://localhost:5173 |
| Local API | http://localhost:5001/api |

## Notes on AI Report Summaries and Privacy

The report-summary workflow accepts PDF, JPEG, and PNG uploads. The user must be signed in and provide consent before the report is sent to the backend for processing with Google Gemini. The backend enforces a 10 MB upload limit and validates supported file types. Do not upload sensitive medical documents unless you understand and consent to how the feature processes them. AI-generated content can be incomplete or incorrect; it must not replace advice from a qualified healthcare professional.

## Current Demo Dataset

The backend seed data currently contains 10 diagnostic tests, 20 laboratories, and approximately 200 lab-price records. Availability and prices are sample values for demonstrating the comparison and booking workflows.

## Build

To create a production frontend build:

```bash
npm run build
```

The generated static assets are placed in the `dist` directory.

## Project Scope

LabLink demonstrates a practical full-stack workflow: a typed React frontend communicates with REST APIs, authenticated users can manage bookings, PostgreSQL stores application data, and a Gemini-powered endpoint provides AI-assisted report summaries.
