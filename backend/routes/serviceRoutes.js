const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const { protect, vendorOnly } = require('../middleware/authMiddleware')

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('vendorId', 'name')
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', protect, vendorOnly, async (req, res) => {
  try {
    const service = await Service.create({ ...req.body, vendorId: req.user.id })
    res.status(201).json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', protect, vendorOnly, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id)
    res.json({ message: 'Service deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router