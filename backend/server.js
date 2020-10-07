const express = require('express')
const dotenv = require('dotenv')
const productsData = require('./data/productsData')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.get('/api/productsData', (req, res) => {
  res.json(productsData)
})

app.get('/api/productsData/:id', (req, res) => {
  const product = productsData.find((item) => item._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
