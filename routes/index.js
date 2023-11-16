const express = require('express')

const usersRouter = require('./users.router.js')
const hotelsRouter = require('./hotels.router.js')
const bookingsRouter = require('./bookings.router.js')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/users', usersRouter)
  router.use('/hotels', hotelsRouter)
  router.use('/bookings', bookingsRouter)
}

module.exports = routerApi