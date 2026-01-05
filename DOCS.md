# PAR-PortfolioHostfy — Setup & Deployment (Beginner-friendly)

## Overview
A minimal full-stack app with:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: Vite + React
- Simple JWT authentication and basic portfolio CRUD

---

## Local setup
1. Install dependencies
   - Root server: `cd server && npm install`
   - Client: `cd client && npm install`
2. Create env files
   - `server/.env` (use `server/.env.example`):
     - MONGO_URI (MongoDB connection string)
     - JWT_SECRET (any secret string)
     - PORT (optional, default 5000)
   - `client/.env` (use `client/.env.example`):
     - VITE_API_URL (e.g., http://localhost:5000)
3. Run
   - Start backend: `cd server && npm run dev`
   - Start frontend: `cd client && npm run dev`
4. Use the UI
   - Browse to the Vite server (usually http://localhost:5173)
   - Register / Login and create portfolios

---

## Simple architecture notes (basic concepts)
- Backend exposes these endpoints: `/api/auth/register`, `/api/auth/login`, `/api/portfolios` (GET public), `/api/portfolios/my` (user's portfolios)
- Auth uses JWT in `Authorization: Bearer <token>` header
- Frontend stores token in `localStorage` for simplicity (beginner-friendly)

---

## Free hosting options & steps

### MongoDB (database)
- Use MongoDB Atlas (free tier)
  1. Create an account at https://www.mongodb.com/cloud/atlas
  2. Create a free cluster, whitelist your IP (or 0.0.0.0/0 for testing), create a database user, and copy the connection string
  3. Set `MONGO_URI` in backend environment to that connection string

### Backend (free choices)
- Render (free for web services with sleep) or Railway (free credits / free tier)
- Quick Render steps (recommended for beginners):
  1. Create a new Web Service on Render
  2. Connect your GitHub repo and select the `server` folder as the root
  3. Set the build command: `npm install` and start command: `npm start` or `npm run dev` (use start in production with a proper process)
  4. Add environment variables on the Render dashboard: `MONGO_URI`, `JWT_SECRET`, `PORT` (optional)
  5. Deploy — Render will provide a public URL

Notes: Use `NODE_ENV=production` in production; ensure your server serves only API endpoints (frontend is separate)

### Frontend (free choices)
- Vercel or Netlify are simple for Vite apps. Recommend Vercel for easy GitHub integration.
- Quick Vercel steps:
  1. Create a Vercel account and connect GitHub
  2. Import the repository and set the **Root Directory** to `client`
  3. Build command: `npm run build`
  4. Output directory: `dist`
  5. Add environment variable `VITE_API_URL` (the public URL of your backend service)
  6. Deploy — Vercel will provide a public URL

Notes: Vercel automatically uses `npm run build` and serves the static site.

---

## Environment & production settings (what to choose)
- `MONGO_URI`: Use your Atlas connection string, replace `<password>` and the default DB in the URI
- `JWT_SECRET`: long random string (e.g., use an online generator)
- Backend `PORT`: typically 5000
- Frontend `VITE_API_URL`: set to your backend public URL

---

## Final tips
- Keep secrets out of the Git history — use environment variables on the hosting platform
- For a production-ready app, add input validation, stronger error handling, HTTPS, and refresh tokens

