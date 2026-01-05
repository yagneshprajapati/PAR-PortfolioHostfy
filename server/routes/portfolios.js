const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Portfolio = require('../models/Portfolio')

router.get('/', async (req, res) => {
  const items = await Portfolio.find({ isPublic: true }).populate('owner', 'name')
  res.json(items)
})

router.get('/my', auth, async (req, res) => {
  const items = await Portfolio.find({ owner: req.user.id })
  res.json(items)
})

router.post('/', auth, async (req, res) => {
  const { title, description, isPublic } = req.body
  const item = await Portfolio.create({ title, description, isPublic, owner: req.user.id })
  res.json(item)
})

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id
  const item = await Portfolio.findById(id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  if (String(item.owner) !== req.user.id) return res.status(403).json({ message: 'Forbidden' })
  Object.assign(item, req.body)
  await item.save()
  res.json(item)
})

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id
  const item = await Portfolio.findById(id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  if (String(item.owner) !== req.user.id) return res.status(403).json({ message: 'Forbidden' })
  await item.remove()
  res.json({ message: 'Deleted' })
})

module.exports = router
