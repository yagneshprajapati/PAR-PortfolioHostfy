const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: Array, default: [] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
