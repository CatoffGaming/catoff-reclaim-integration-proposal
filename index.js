const express = require('express')
const {signHandler} = require('./src/controllers/reclaimController')

const app = express()
app.use(express.json())

app.post('/reclaim/sign',signHandler);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
