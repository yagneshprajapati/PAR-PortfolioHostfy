const mongoose = require('mongoose')
const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfoliohostfy'

module.exports = function () {
  mongoose.set('strictQuery', false)
  return mongoose.connect(url).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB error', err))
}
