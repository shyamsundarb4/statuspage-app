# statuspage-app
# StatusPage App

A full-stack status page application with multi-tenant, team, and user management.

## Features

- Public status page for services, incidents, maintenances, and history
- Admin dashboard for managing services, incidents, maintenances, users, and teams
- Auth0 authentication and RBAC
- Real-time updates with Socket.IO

## Setup

1. Clone the repo:
   ```
   git clone https://github.com/<your-username>/<repo-name>.git
   cd statuspage-app
   ```

2. Install dependencies:
   ```
   npm install
   cd apps/api
   npm install
   cd ../web
   npm install
   ```

3. Set up your `.env` files for backend and frontend .

4. Run the backend:
   ```
   cd ../../api
   node index.js
   ```

5. Run the frontend:
   ```
   cd ../web
   npm run dev
   ```

## Deployment

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/) or [Railway](https://railway.app/)

