const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'devsecret'
module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const payload = jwt.verify(token, secret)
    req.user = payload
    next()
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
