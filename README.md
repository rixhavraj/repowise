# RepoWise

RepoWise is a GitHub-powered knowledge publishing platform. The frontend is a
Next.js application and the backend is an independent Express API backed by
MongoDB.

## Project structure

```text
repowise/
├── frontend/              # Next.js web application
│   ├── src/app/            # Pages and UI
│   ├── package.json
│   └── .env.example
├── backend/               # Express API and MongoDB connection
│   ├── src/server.ts
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB Community Server running locally, or a MongoDB connection string
- A GitHub OAuth App for GitHub login

## Configuration

Create the environment files from the examples:

```powershell
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

`frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

`backend/.env`:

```env
PORT=4000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=repowise
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

Never commit `.env` files or real secrets.

## GitHub OAuth configuration

In the GitHub OAuth App settings, use:

```text
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:4000/api/auth/github/callback
```

## Run locally

Install dependencies in both applications:

```powershell
cd backend
npm install

cd ../frontend
npm install
```

Start the backend in one terminal:

```powershell
cd backend
npm run dev
```

Start the frontend in another terminal:

```powershell
cd frontend
npm run dev
```

Open `http://localhost:3000`. The backend health endpoint is available at
`http://localhost:4000/api/health`.

## Production build

```powershell
cd frontend
npm run build

cd ../backend
npm run start
```

Set `FRONTEND_URL`, `NEXT_PUBLIC_API_URL`, MongoDB, and GitHub values to their
production URLs before deployment.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check API and MongoDB availability |
| GET | `/api/auth/github` | Start GitHub OAuth |
| GET | `/api/auth/github/callback` | Complete GitHub OAuth |
| POST | `/api/webhooks/github` | Receive signed GitHub webhooks |

## Security

Use strong secrets in production, enable HTTPS, restrict CORS to the real
frontend URL, and keep `.env` files out of Git. MongoDB should also require
authentication in production.
