const mongoose = require('mongoose')

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error: ', error)
  }
}

module.exports = { connectDB }
