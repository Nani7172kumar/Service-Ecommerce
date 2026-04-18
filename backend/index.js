const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err))

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000')
})