const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret = process.env.JWT_SECRET || 'devsecret'

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email exists' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' })
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid creds' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ message: 'Invalid creds' })
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
