const mongoose = require('mongoose')
const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  skills: { type: [String], default: [] },
  links: { type: [String], default: [] },
  thumbnail: { type: String } // data URL (base64) for simple thumbnail upload
}, { timestamps: true })
module.exports = mongoose.model('Portfolio', PortfolioSchema)
