# Deployment Guide: Cloud Arbitrage Engine 

This guide provides step-by-step instructions for deploying the full-stack application using **Vercel** (Frontend) and **Render** (Backend), with a **MongoDB Atlas** database.

---

## 1. Backend Deployment (Render)

### Prerequisites
- A [Render](https://render.com/) account.
- Your project uploaded to a GitHub repository.

### Steps
1. **New Web Service**: Log in to Render and click **New +** > **Web Service**.
2. **Connect Repo**: Select your GitHub repository.
3. **Region**: Choose a region closest to your users (e.g., Singapore or Frankfurt).
4. **Environment**: Select `Node`.
5. **Root Directory**: Set this to `server`.
6. **Build Command**: `npm install`
7. **Start Command**: `node index.js`
8. **Environment Variables**:
   - Click the **Environment** tab.
   - Add `MONGO_URI`: Your MongoDB Atlas connection string.
   - Add `PORT`: `5000` (or leave default).
9. **Deploy**: Render will automatically build and start your backend. Note down the **Service URL** (e.g., `https://cloud-engine-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

### Prerequisites
- A [Vercel](https://vercel.com/) account.

### Steps
1. **New Project**: Log in to Vercel and click **Add New** > **Project**.
2. **Connect Repo**: Select your GitHub repository.
3. **Framework Preset**: Select `Vite`.
4. **Root Directory**: Set this to `client`.
5. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Update API URL**:
   - *Crucial*: Before deploying, ensure your frontend API calls point to your Render URL.
   - Open `client/src/pages/DashboardPage.jsx`, `SimulatorPage.jsx`, etc.
   - Update the fetch URLs:
     ```javascript
     // Change:
     fetch('http://localhost:5000/api/...')
     
     // To:
     fetch('https://your-render-api-url.onrender.com/api/...')
     ```
7. **Deploy**: Click **Deploy**. Vercel will provide your frontend URL.

---

## 3. Database Security (MongoDB Atlas)

Ensure your Render service IP can connect to your database:
1. Go to **Network Access** in MongoDB Atlas.
2. Click **Add IP Address**.
3. Select **Allow Access from Anywhere** (`0.0.0.0/0`) during deployment (or add Render's specific outbound IP if available).

---

##  Summary of Final URLs
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-service.onrender.com`

---
**Note**: Since Render's free tier "spins down" after inactivity, the first request to the backend after a break might take 30-60 seconds to respond.
