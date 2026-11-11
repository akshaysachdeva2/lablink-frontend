# LabLink – Diagnostic Test Comparison & Booking Platform

LabLink is a web-based diagnostic test comparison and appointment booking application that helps users explore medical tests, compare prices across diagnostic laboratories, and book appointments conveniently.

The application provides a centralized platform where users can browse available tests, view laboratory-wise pricing and availability, register or log in, and manage their bookings.

## Key Features

- **Diagnostic Test Search:** Browse and search available diagnostic tests.
- **Lab Price Comparison:** Compare test prices across multiple partner laboratories.
- **Test Details:** View detailed information about tests, laboratory pricing, and availability.
- **User Authentication:** Register and log in securely using JWT-based authentication.
- **Appointment Booking:** Book diagnostic tests through authenticated user accounts.
- **Booking History:** View previously created bookings.
- **Booking Management:** Manage existing bookings through the application.

## Technology Stack

| Category | Technology |
|---|---|
| Frontend | React |
| Programming Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| Styling | CSS |
| HTTP Client | Axios |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| Authentication | JWT, bcrypt |

## Project Requirements

Make sure the following software is installed:

- Node.js 20 or newer
- npm
- Git (optional, for version control)
- Visual Studio Code (recommended)

The LabLink backend must be running separately.

## Project Setup

### 1. Clone the Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd lablink-typescript
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend root directory.

Add the following configuration:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Alternatively, copy `.env.example` to `.env` and verify the API URL.

**Important:** Never commit private credentials, passwords, API keys, or secret tokens to GitHub.

### 4. Start the Frontend

Run the development server:

```bash
npm run dev
```

Open the local URL provided by Vite, normally:

```text
http://localhost:5173
```

## Running the Backend

The frontend requires the LabLink backend to be running.

Open a separate terminal and navigate to the backend project:

```bash
cd lablink-backend
```

Install the backend dependencies if you have not already:

```bash
npm install
```

Configure the backend environment variables and PostgreSQL database according to the backend project's README.

Run the backend:

```bash
npm run dev
```

The backend API runs at:

```text
http://localhost:5001/api
```

You can check the backend health endpoint at:

```text
http://localhost:5001/api/health
```

### Application Configuration

| Component | Local URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5001/api |
| Backend Health Check | http://localhost:5001/api/health |

The backend CORS configuration allows requests from the Vite development URL.

## Database

LabLink uses **PostgreSQL** as its relational database.

The database stores application information such as:

- User accounts
- Diagnostic laboratories
- Available diagnostic tests
- Laboratory-wise test prices
- Appointment bookings

The backend project contains the SQL files required to initialize and seed the database.

The demonstration database currently includes six sample diagnostic tests and six sample partner laboratories.

**Note:** The included laboratory and test records are demonstration data and do not represent endorsements of actual diagnostic providers.

## Build for Production

To verify that the frontend compiles successfully, run:

```bash
npm run build
```

Vite generates the production build in the `dist` directory.

## Troubleshooting

**1. Backend API is not responding**

- Ensure the backend server is running on port `5001`.
- Check the backend health endpoint.
- Verify the `VITE_API_BASE_URL` value in `.env`.

**2. Dependencies are missing**

Run:

```bash
npm install
```

**3. Environment variable changes are not reflected**

Stop the Vite development server and restart it:

```bash
npm run dev
```

**4. CORS errors**

Verify that the backend allows requests from:

```text
http://localhost:5173
```

**5. Database connection errors**

- Ensure PostgreSQL is running.
- Verify the backend database credentials.
- Confirm that the required SQL initialization and seed scripts have been executed.

## Future Enhancements

Potential improvements for future versions include:

- Online payment integration.
- Email and SMS booking notifications.
- Advanced filtering and sorting.
- Real-time appointment availability.
- Admin dashboard for laboratory management.
- Responsive UI improvements.

## Project Purpose

LabLink was developed as a full-stack application to demonstrate practical skills in frontend development, backend API integration, authentication, relational database management, and appointment booking workflows.

The project combines React, TypeScript, Node.js, Express, and PostgreSQL to create an integrated diagnostic test comparison and booking experience.

---

**Project:** LabLink  
**Frontend:** React + TypeScript + Vite  
**Backend:** Node.js + Express + TypeScript  
**Database:** PostgreSQL