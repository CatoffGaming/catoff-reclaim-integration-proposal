const express = require('express')
const bodyParser = require('body-parser')
const reclaimController = require('./src/controllers/reclaimController')
require('dotenv').config();
const app = express()
app.use(bodyParser.json())

app.post('/reclaim/sign', reclaimController.signHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
