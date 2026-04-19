# Cloud Arbitrage Engine 

A high-performance, full-stack cloud cost optimization platform built with the MERN stack. Designed for developers and startups to simulate workloads, compare global cloud providers in INR, and uncover deep financial optimizations using smart arbitrage logic.

---
## Since the last domain was flagging the site with a phishing threat , changed its name to :    
https://cloud-chanakya.vercel.app/
https://cloud-labca-project.vercel.app/

##  Theory & Syllabus Mapping

This project is built as a practical implementation of core Cloud Computing concepts found in the curriculum. Below is the mapping of theoretical modules to their functional implementation in this engine.

### Module 1: Introduction & Service Models
- **Concepts**: IaaS, PaaS, SaaS, and Horizontal/Vertical Scaling.
- **Project Implementation**: 
  - **Service Selection**: The **Simulator** allows users to define workloads that mimic IaaS (Infrastructure as a Service) requirements by specifying raw CPU/RAM.
  - **Scaling Simulation**: The **What-If** module simulates the financial impact of **Horizontal Scaling** (adding more instances) versus the baseline cost, allowing users to visualize how bills explode during traffic spikes.

### Module 4: Cloud Architecture Comparison
- **Concepts**: Comparison of cloud providers (AWS, Azure, Google Cloud Platform).
- **Project Implementation**:
  - **Provider Benchmarking**: The **Dashboard** provides a direct architectural and financial comparison between the "Big Three" (AWS, Azure, GCP) and niche providers. It evaluates them based on regional pricing (ap-south-1) and performance benchmarks rather than just raw cost.

### Module 5: Cloud Cost Management & Security
- **Concepts**: Cost optimization, Reserved vs. Spot instances, and FinOps principles.
- **Project Implementation**:
  - **FinOps Action**: The engine's core purpose is **Cloud Cost Optimization**. It identifies arbitrage opportunities where a workload can be moved from one provider to another for better value.
  - **Smart Optimization**: The **Simulator** provides suggestions like "Check for Spot Instance availability" or "Use Reserved Instances for 24/7 workloads," directly implementing the cost-saving strategies defined in the syllabus.
  - **Security Design**: The **Security Audit** module evaluates architectures against Information Security threats and region-specific risks, providing a risk score (0-100) based on industry security principles.

---

##  Deployment Guide

Follow these steps to set up the Cloud Arbitrage Engine on your local machine or a production server.

###  Prerequisites
- **Node.js**: v16.x or higher
- **npm**: v8.x or higher
- **MongoDB Atlas**: A live cluster (or local MongoDB Compass instance)
- **Git**: For cloning the repository

###  Step 1: Clone & Install
```bash
# Clone the repository
git clone https://github.com/Ha3ar6ous/cloud-arbitrage-engine.git

# Navigate to project root
cd cloud-arbitrage-engine

# Install Backend dependencies
cd server
npm install

# Install Frontend dependencies
cd ../client
npm install
```

###  Step 2: Environment Variables
Create a `.env` file inside the `server/` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
*(Replace `your_mongodb_connection_string` with your actual Atlas URI)*

###  Step 3: Run the Application

#### A. Start the Backend
```bash
cd server
npm run dev
```
*Server should be running on `http://localhost:5000`*

#### B. Start the Frontend
```bash
cd client
npm run dev
```
*Application should be accessible at `http://localhost:5173`*

###  Step 4: Build for Production
If you are deploying to a production environment (like Vercel or Render):
```bash
# In the client directory
npm run build
```
*This generates a `dist/` folder. Ensure your backend serves this static folder if deploying as a single unit.*

---

##  Common Errors & Fixes
- **Error: `MONGO_URI` not defined**: Ensure your `.env` file is in the `server` root, not the project root.
- **Error: Port 5000 already in use**: Change the `PORT` in `.env` or kill the process using `npx kill-port 5000`.
- **Image Not Loading**: Ensure all visual assets are in `client/public/`.
- **CORS Error**: The server is configured for `localhost:5173`. Update line 15 in `server/index.js` if running on a different frontend port.

---
Built for Cloud Efficiency and Academic Excellence.
