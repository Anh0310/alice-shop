require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { errorHandler } = require('./src/middlewares/errorHandler')
const authRouter = require('./src/routes/auth.route')
const userRouter = require('./src/routes/user.route')
const categoryRouter = require('./src/routes/category.route')
const sizeRouter = require('./src/routes/size.route')
const productRouter = require('./src/routes/product.route')
const orderRouter = require('./src/routes/order.route')
const paymentRouter = require('./src/routes/payment.route')
const uploadRouter = require('./src/routes/upload.route')

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error: ', error)
  }
}

const app = express()
connectDB()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())
app.use(
  fileUpload({
    useTempFiles: true,
  }),
)

// Routes
app.use(
  '/api',
  authRouter,
  userRouter,
  categoryRouter,
  sizeRouter,
  productRouter,
  orderRouter,
  paymentRouter,
  uploadRouter,
)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// Unhandled route
app.all('*', (req, res, next) => {
  const err = new Error('The route can not be found')
  err.statusCode = 404
  next(err)
})

// Error handle
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
})
