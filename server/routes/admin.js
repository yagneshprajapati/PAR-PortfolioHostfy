const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// seed an admin user via ADMIN_SECRET (simple, for dev)
router.post('/seed-admin', async (req, res) => {
  const secret = req.header('x-admin-secret')
  if (!secret || secret !== process.env.ADMIN_SECRET) return res.status(401).json({ message: 'Unauthorized' })
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ message: 'User exists' })
  const hashed = await bcrypt.hash(password, 10)
  const admin = await User.create({ name, email, password: hashed, role: 'admin' })
  res.json({ id: admin._id, email: admin.email })
})

router.get('/users', async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
})

module.exports = router
