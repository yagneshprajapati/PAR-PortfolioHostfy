const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const PortfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Portfolio = mongoose.model('Portfolio', PortfolioSchema)

router.get('/', async (req, res) => {
  const list = await Portfolio.find().limit(20)
  res.json(list)
})

router.post('/', async (req, res) => {
  const item = await Portfolio.create(req.body)
  res.status(201).json(item)
})

module.exports = router
