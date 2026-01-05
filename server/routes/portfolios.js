const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const list = await Portfolio.find({ published: true }).populate('owner', 'name email');
  res.json(list);
});

router.get('/me', auth, async (req, res) => {
  const list = await Portfolio.find({ owner: req.user.id }).populate('owner', 'name email');
  res.json(list);
});

router.post('/', auth, async (req, res) => {
  if (req.user.role === 'viewer') return res.status(403).json({ message: 'Not allowed' });
  const { title, description, content, published } = req.body;
  const p = await Portfolio.create({ title, description, content, published, owner: req.user.id });
  res.json(p);
});

router.get('/:id', async (req, res) => {
  const p = await Portfolio.findById(req.params.id).populate('owner', 'name email');
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (!p.published) return res.status(403).json({ message: 'Not published' });
  res.json(p);
});

router.put('/:id', auth, async (req, res) => {
  const p = await Portfolio.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (p.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });
  p.title = req.body.title ?? p.title;
  p.description = req.body.description ?? p.description;
  p.content = req.body.content ?? p.content;
  p.published = req.body.published ?? p.published;
  await p.save();
  res.json(p);
});

router.delete('/:id', auth, async (req, res) => {
  const p = await Portfolio.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (p.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });
  await p.remove();
  res.json({ message: 'Deleted' });
});

module.exports = router;
