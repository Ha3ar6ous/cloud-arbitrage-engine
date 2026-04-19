# Cloud Arbitrage Engine - Setup & Run Guide

This guide covers everything required to set up, configure, and run the Cloud Arbitrage Engine project locally with a MongoDB backend.

---

## 1. Project Setup

Open two terminal windows—one for the Frontend and one for the Backend.

### Frontend
Navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```

### Backend
Navigate to the `server` directory:
```bash
cd server
npm install
npm run dev # Uses nodemon server.js OR nodemon index.js depending on package.json
```

---

## 2. MongoDB Atlas Setup

To persist and fetch real-time cloud data, set up a MongoDB Atlas cluster.

1. **Create an Account:** Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/log in.
2. **Deploy Cluster:** Click **Build a Database** and select the **FREE Shared Cluster**. Choose a region near you.
3. **Database Security (User):** 
   - Under **Database Access**, click **Add New Database User**.
   - Set Authentication Method to **Password**.
   - Provide a Username and Auto-Generate a secure password. Save these.
4. **Network Access (IP Whitelist):**
   - Under **Network Access**, click **Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) for local development, or add your current IP.
5. **Get Connection String:**
   - Go back to **Database** and click **Connect** on your cluster.
   - Choose **Connect your application**.
   - Copy the string provided. It looks like this:
     `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`

---

## 3. Backend Integration

To integrate MongoDB into the Express backend:

1. **Install Mongoose:** In your `server` directory, run:
   ```bash
   npm install mongoose dotenv
   ```
2. **Create Database Configuration:** Create `server/config/db.js` with the following:
   ```javascript
   const mongoose = require('mongoose');

   const connectDB = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
       });
       console.log('MongoDB Connected...');
     } catch (err) {
       console.error('MongoDB Connection Error: ', err.message);
       process.exit(1);
     }
   };

   module.exports = connectDB;
   ```
3. **Initialize Connection:** Import and call `connectDB()` inside your `server/index.js` file before your routes.

---

## 4. Environment Variables

Create a file named `.env` in the root of your `server` directory:

```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/cloudAppDB
PORT=5000
```
> **Note:** Do not use `< >` tags inside the connection string. Replace the text exactly.

---

## 5. Collections

Inside MongoDB Atlas, you will need to establish your `pricing` collection.

1. Inside Atlas, click **Browse Collections** on your Database.
2. Click **Add My Own Data** (Db Name: `cloudAppDB`, Collection Name: `pricing`).
3. **Insert Dummy Data:** Click **Insert Document** and manually add your basic provider JSON objects via the UI (e.g. AWS, GCP, Azure specific base costs). Once Mongoose schema is structured, your controllers can fetch directly from this collection instead of local logic.

---

## 6. Running Full App

Once configuration is complete:

1. **Start Backend**: Ensure you are in the `server` directory and run `npm run dev`. Verify the terminal logs: `MongoDB Connected...` and `Server running on http://localhost:5000`.
2. **Start Frontend**: Ensure you are in the `client` directory and run `npm run dev`.
3. **Interact**: Open your browser at `http://localhost:5173` (or the port Vite provides) and interact with the application. Form submissions will now accurately hit your backend logic.

---

## 7. Notes

- **Current Architecture (Dummy Data):** Currently, Provider dummy pricing dictates behavior locally inside `server/services/pricingService.js` and `server/controllers/compareController.js`. Transitioning to MongoDB means you must update these service files to utilize `mongoose.model('Pricing').find()` instead of relying on the hard-coded dictionaries.
- **Images & Icons:** Provider logos in the Comparison Dashboard (`client/src/components/ProviderTable.jsx`) use direct Wikipedia SVG URLs. You can replace these strings with local assets if you wish to host them directly inside `client/src/assets/`.

---

## 8. Troubleshooting

- **MongoDB "Authentication Failed":** Verify that your `<password>` in the `.env` `MONGO_URI` does not contain unescaped special characters, and that you removed the `< >` brackets.
- **MongoDB "IP Not Whitelisted":** Ensure your Network Access in Atlas is set up properly for `0.0.0.0/0`.
- **CORS Issues:** If the frontend gets blocked sending POST requests, ensure you require `cors` in your backend `index.js` and use it globally: `app.use(cors())`.
- **Port Conflicts:** If `PORT=5000` is already in use (e.g. by MacOS Control Center), modify the `.env` file to use `PORT=5001` and update your React frontend `fetch` calls to point to the new port.
