# Cloud Arbitrage Engine

A full-stack cloud cost optimization platform built with the MERN stack. Simulate workloads, compare providers, run what-if scenarios, and audit security posture — all from a single dashboard.

---

## Features

### Simulator
Configure CPU, RAM, storage, region, and workload type. The engine calculates estimated monthly costs across AWS, Azure, and GCP and recommends the cheapest provider with optimization suggestions.

### Comparison Dashboard
Visual side-by-side comparison of cloud providers. Displays cost breakdowns, performance scores, and reliability metrics in both tabular and bar chart formats.

### What-If Analysis
Adjust traffic levels, toggle auto-scaling, switch regions, and change instance types in real-time. Costs update live with debounced API calls and trend indicators showing cost direction.

### Security & Reliability Audit
Input your architecture context (provider, region, data sensitivity, public/private deployment) and receive an automated risk score (0–100), identified issues, and actionable recommendations.

---

## Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React, React Router, React Icons |
| Backend   | Node.js, Express          |
| Database  | MongoDB Atlas (Mongoose)  |
| Dev Tools | Vite, Nodemon             |

---

## Project Structure

```
cloud/
├── client/                      # React frontend
│   ├── public/
│   │   └── providers/           # Provider logo images (aws.png, azure.png, gcp.png)
│   └── src/
│       ├── components/          # Reusable UI components
│       │   ├── CostChart.jsx
│       │   ├── InputForm.jsx
│       │   ├── Layout.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── ProviderTable.jsx
│       │   ├── ResultCard.jsx
│       │   └── RiskPanel.jsx
│       ├── context/
│       │   └── AuthContext.jsx  # Auth state management
│       ├── data/
│       │   └── pricingData.json # India-specific pricing (INR)
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── SecurityPage.jsx
│       │   ├── SimulatorPage.jsx
│       │   └── WhatIfPage.jsx
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/                      # Express backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── compareController.js
│   │   ├── securityController.js
│   │   ├── simulateController.js
│   │   └── whatifController.js
│   ├── middlewares/
│   │   └── auth.js              # Username header validation
│   ├── models/
│   │   └── User.js              # Mongoose user schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── compare.js
│   │   ├── security.js
│   │   ├── simulate.js
│   │   └── whatif.js
│   ├── services/
│   │   ├── securityService.js
│   │   └── strategyService.js
│   ├── .env
│   └── index.js
│
├── HOW_TO_RUN.md
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB Atlas account

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

The backend uses `nodemon` for auto-restart on file changes.

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account.
2. Click **Build a Database** and select the free **M0 Shared** tier.
3. Under **Database Access**, add a new database user with a username and password.
4. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere (for development).
5. Go back to **Database**, click **Connect**, choose **Connect your application**, and copy the connection string.

Connection string format:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
```

---

## Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cloudApp
PORT=5000
```

Replace `<username>`, `<password>`, and `<cluster>` with your Atlas credentials.

---

## Deployment Guide

### Frontend (Vercel / Netlify)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Import your GitHub repository.
4. Set the root directory to `client`.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

### Backend (Render / Railway)

1. Push your repository to GitHub.
2. Go to [Render](https://render.com) or [Railway](https://railway.app).
3. Create a new **Web Service** and connect your repo.
4. Set the root directory to `server`.
5. Start command: `node index.js`
6. Add environment variables:
   - `MONGO_URI` — your Atlas connection string
   - `PORT` — `5000` (or let the platform assign one)
7. Deploy.

> After deploying backend, update all `http://localhost:5000` references in the frontend to your deployed backend URL.

---

## Future Improvements

- Integration with real-time pricing APIs from AWS, Azure, and GCP
- Multi-user accounts with password authentication (JWT)
- Historical cost tracking and analytics dashboards
- Region-aware latency simulation
- Export reports as PDF
- Role-based access control (Admin / Viewer)

---

## License

This project is for educational and portfolio purposes.
