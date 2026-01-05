const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')

const router = express.Router()

const PortfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Portfolio = mongoose.model('Portfolio', PortfolioSchema)

router.get('/', async (req, res) => {
  const list = await Portfolio.find().limit(20).populate('owner', 'name email')
  res.json(list)
})

router.post('/', auth, async (req, res) => {
  try {
    const item = await Portfolio.create({ ...req.body, owner: req.user.id })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
