const express = require('express')
const bodyParser = require('body-parser')
const reclaimController = require('./src/controllers/reclaimController')
const exampleController = require('./src/controllers/exampleController')

const app = express()
app.use(bodyParser.json())

app.post('/reclaim/sign', reclaimController.signHandler)
app.post('/verify-uber-rides', exampleController.verifyUberRides);
app.post('/validate-course-completion', exampleController.validateCourseCompletion);
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
