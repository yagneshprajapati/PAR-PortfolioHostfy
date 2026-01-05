const mongoose = require('mongoose')
const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true }
}, { timestamps: true })
module.exports = mongoose.model('Portfolio', PortfolioSchema)
