const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let counter = 0

app.get('/ping', (req, res) => {
  counter++
  console.log('Counter:', counter)
  res.json({ counter })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
