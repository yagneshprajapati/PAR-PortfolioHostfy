# Server

Run locally:

1. Create `.env` file from `.env.example` and set `MONGO_URI` and `JWT_SECRET`.
2. cd server
3. npm install
4. npm run dev (ensure you have nodemon)

API endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/portfolios
- GET /api/portfolios/me
- POST /api/portfolios
- GET /api/portfolios/:id
- PUT /api/portfolios/:id
- DELETE /api/portfolios/:id
