# PAR-PortfolioHostfy

PortfolioHostfy | MongoDB, Express.js, React.js, Node.js Full Stack

Features
- Built a multi-role portfolio hosting platform with Admin, Creator, and Viewer access levels
- Implemented JWT-based authentication and role-based authorization for secure user management
- RESTful APIs for portfolio CRUD operations, user management, and content moderation
- Dynamic React dashboard for creators to customize and publish portfolios
- Responsive UI with reusable components

Quick start
1. Clone repository
2. Create a MongoDB Atlas free cluster and get the connection string
3. Create `.env` files for server and client with required env vars

Run server
- cd server
- npm install
- npm run dev

Run client
- cd client
- npm install
- npm run dev

Deployment
- Frontend: Vercel or Netlify — Build: `npm run build`, Publish: `dist`
- Backend: Render or Railway — set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`

More detailed documentation and step-by-step instructions are included in `DOCUMENTATION.md`.
