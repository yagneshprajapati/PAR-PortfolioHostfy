# PAR-PortfolioHostfy

PortfolioHostfy | MongoDB, Express.js, React.js, Node.js Full Stack

- Built a multi-role portfolio hosting platform with Admin, Creator, and Viewer access levels
- Implemented JWT-based authentication and role-based authorization for secure user management
- Developed RESTful APIs for portfolio CRUD operations, user management, and content moderation
- Created dynamic React dashboard for creators to customize and publish their portfolios
- Designed responsive UI with reusable components ensuring consistent user experience across roles

## Overview

This repository contains a beginner-friendly full-stack project with two folders at root: `client` (Vite + React) and `server` (Express + Node + MongoDB). It provides a minimal, documented starter you can extend.

## What I scaffolded

- `server/` - Express API with Mongoose, auth routes, and portfolio routes
- `client/` - Vite React app with a minimal starter UI
- `.gitignore` and `README.md`

## Quick setup (local)

1. Install dependencies for server and client

```powershell
cd "c:\mern projects\PAR2-PortfolioHostfy\server"
npm install
cd "..\client"
npm install
```

2. Create env files from examples and provide values

```powershell
copy server\.env.example server\.env
copy client\.env.example client\.env
```

3. Run in development

```powershell
cd server
npm run dev
cd ../client
npm run dev
```

## Hosting (free options)

- Frontend: Vercel or Netlify. Choose Vercel for simplest React + Vite flow. Set build command `npm run build` and output directory `dist`.
- Backend: Render (free tier web service) or Railway. Use Node service, set `start` script and environment variables (MONGO_URI, JWT_SECRET). For Render choose "Web Service", connect repo, set build and start commands.
- Database: MongoDB Atlas free tier. Create a cluster, whitelist IPs or use 0.0.0.0/0 for testing, create a user, and use the connection string as `MONGO_URI` in backend env.

Recommended settings:

- Vercel: Framework Preset `Create React App` is fine; build command `npm run build`; output `dist`.
- Render: instance type `Free`, Environment `Node`, Build Command `npm install && npm run build` (if building) and Start Command `node src/index.js`.
- MongoDB Atlas: choose free Shared Cluster (M0), create database user, copy connection string, replace `<password>` and `<dbname>`.

## Notes

This scaffold is intentionally minimal to be beginner-friendly. Extend models, add tests, and refine UI as next steps.
