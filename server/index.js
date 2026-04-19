const express = require('express')
const cors = require('cors')
const simulateRoute = require('./routes/simulate')
const compareRoute = require('./routes/compare')
const whatifRoute = require('./routes/whatif')
const securityRoute = require('./routes/security')

const app = express()
app.use(cors())
app.use(express.json())

let counter = 0

app.get('/ping', (req, res) => {
  counter++
  console.log('Counter:', counter)
  res.json({ counter })
})

app.use('/api/simulate', simulateRoute)
app.use('/api/compare', compareRoute)
app.use('/api/whatif', whatifRoute)
app.use('/api/security', securityRoute)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
