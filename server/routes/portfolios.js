const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Portfolio = require('../models/Portfolio')

router.get('/', async (req, res) => {
  const items = await Portfolio.find({ isPublic: true }).populate('owner', 'name')
  res.json(items)
})

// search: /api/portfolios/search?q=react
router.get('/search', async (req, res) => {
  const q = req.query.q || ''
  const items = await Portfolio.find({ isPublic: true, $or: [
    { title: new RegExp(q, 'i') },
    { description: new RegExp(q, 'i') },
    { skills: new RegExp(q, 'i') }
  ]}).populate('owner', 'name')
  res.json(items)
})

router.get('/featured', async (req, res) => {
  const items = await Portfolio.find({ isPublic: true, featured: true }).populate('owner', 'name')
  res.json(items)
})

router.get('/:id', async (req, res) => {
  const item = await Portfolio.findById(req.params.id).populate('owner', 'name')
  if (!item) return res.status(404).json({ message: 'Not found' })
  res.json(item)
})

router.get('/my', auth, async (req, res) => {
  const items = await Portfolio.find({ owner: req.user.id })
  res.json(items)
})

router.post('/', auth, async (req, res) => {
  const { title, description, isPublic, skills, links, thumbnail } = req.body
  if (!title) return res.status(400).json({ message: 'Title required' })
  const item = await Portfolio.create({ title, description, isPublic, skills, links, thumbnail, owner: req.user.id })
  res.json(item)
})

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id
  const item = await Portfolio.findById(id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  if (String(item.owner) !== req.user.id) return res.status(403).json({ message: 'Forbidden' })
  const { title, description, isPublic, skills, links, thumbnail, featured } = req.body
  Object.assign(item, { title, description, isPublic, skills, links, thumbnail, featured })
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
