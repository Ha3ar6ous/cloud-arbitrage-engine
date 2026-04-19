// Centralized API configuration
// Switch between development (localhost) and production (Render)

const isProduction = window.location.hostname !== 'localhost';

const API_BASE_URL = isProduction 
  ? 'https://cloud-arbitrage-engine.onrender.com' 
  : 'http://localhost:5000';

export default API_BASE_URL;
