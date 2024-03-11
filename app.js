const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
require('express-async-errors')
require('dotenv').config()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

  app.use(express.json())
  app.use(cors())
  app.use(express.static('dist'))
  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

module.exports = app