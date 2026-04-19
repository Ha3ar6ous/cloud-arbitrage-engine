# Sample Execution Runs: Cloud Arbitrage Engine 📊

This guide provides realistic scenarios to demonstrate how the platform processes inputs to generate strategic cloud recommendations.

---

## 1. Simulator Module: "The Cost-Performance Balance"

### Scenario: High-Performance Data Processing Startup
- **Inputs**:
  - **CPU**: 16 Cores
  - **RAM**: 64 GB
  - **Storage**: 500 GB (SSD)
  - **Region**: Asia Pacific (Mumbai)
- **Processing Logic**:
  - The engine calculates base hourly rates from `pricingData.json`.
  - It applies a **Performance Weight** (GCP usually scores highest for raw compute density).
  - It checks **Regional Availability** (ap-south-1).
- **Expected Output**:
  - **Rank 1**: Google Cloud (GCP)
  - **Reasoning**: "While Azure is 4% cheaper in this region, GCP provides a 12% better Performance Score (91), leading to a higher composite Arbitrage Rating."

---

## 2. What-If Module: "Scaling & Explosion Testing"

### Scenario: Viral Marketing Campaign (Rapid Growth)
- **Inputs**:
  - **Base CPU/RAM**: 2 vCPU / 4 GB
  - **Traffic Toggle**: 8,500 active users/mo
  - **Auto-Scaling**: **ON**
- **Processing Logic**:
  - The engine calculates the number of "Scaling Units" required to handle the traffic load.
  - With Auto-Scaling **ON**, it predicts the cost of horizontal scaling (adding instances).
  - With Auto-Scaling **OFF**, it predicts failure/latency risks.
- **Expected Output**:
  - **Visual Indicator**: 📉 (Savings Opportunity)
  - **Recommendation**: "Switching to Reserved Instances (RI) for this sustained traffic level will save you ₹12,400/mo compared to On-Demand scaling behavior."

---

## 3. Security Module: "Compliance Check"

### Scenario: FinTech Application (High Sensitivity)
- **Inputs**:
  - **Provider**: Microsoft Azure
  - **Region**: Europe (Ireland)
  - **Data Sensitivity**: **High (PII/Financial)**
  - **Public Access**: **OFF**
- **Processing Logic**:
  - The engine checks if the combination of "High Sensitivity" and "Private Access" is properly handled.
  - It cross-references historical Azure incidents in EU-West-1.
- **Expected Output**:
  - **Risk Score**: 15/100 (Safe)
  - **Incident Feed**: Highlights the Oct 2021 Azure DNS Outage but confirms current regional stability for financial workloads.
  - **Advice**: "Enable Azure Key Vault and SQL Transparent Data Encryption to reach a zero-risk state."

---

## 🛠️ Summary of Calculation Factors

| Factor | Influence | Module Impact |
| :--- | :--- | :--- |
| **Provider Multiplier** | Adjusts base cost for premium features. | Simulator |
| **Scaling Density** | Predicts cost leaps during traffic spikes. | What-If |
| **Region Latency** | Influences the reliability/performance score. | Security |
| **Data Weighting** | Penalizes scores for sensitive data on public nodes. | Security |
