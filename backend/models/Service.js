const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String },
  description: { type: String },
  vendorId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)