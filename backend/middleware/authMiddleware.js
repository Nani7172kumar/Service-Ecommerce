const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
  next()
}

const vendorOnly = (req, res, next) => {
  if (req.user.role !== 'vendor' && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Vendor only' })
  next()
}

module.exports = { protect, adminOnly, vendorOnly }