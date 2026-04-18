const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  vendorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date:      { type: String, required: true },
  time:      { type: String, required: true },
  address:   { type: String },
  status:    { type: String, enum: ['pending','confirmed','cancelled','completed'], default: 'pending' },
  payment:   { type: String, enum: ['pending','paid'], default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)