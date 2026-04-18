const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user.id })
    res.status(201).json({ message: 'Booking confirmed!', booking })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('serviceId')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/vendor', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ vendorId: req.user.id })
      .populate('serviceId').populate('userId', 'name email')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/all', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('serviceId').populate('userId', 'name email')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router