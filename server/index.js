require('dotenv').config();
const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db');
const { requireUser } = require('./middlewares/auth');

const authRoute = require('./routes/auth')
const simulateRoute = require('./routes/simulate')
const compareRoute = require('./routes/compare')
const whatifRoute = require('./routes/whatif')
const securityRoute = require('./routes/security')

const app = express()

// Connect to MongoDB
connectDB();

app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
  res.json({ message: 'Pong' })
})

// Public routes
app.use('/api/auth', authRoute)

// Protected routes
app.use('/api/simulate', requireUser, simulateRoute)
app.use('/api/compare', requireUser, compareRoute)
app.use('/api/whatif', requireUser, whatifRoute)
app.use('/api/security', requireUser, securityRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
