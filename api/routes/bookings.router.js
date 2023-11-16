const express = require('express')
const BookingService = require('../services/booking.service')
const {
  getBookingSchema,
  updateBookingSchema,
  createBookingSchema
} = require('../schemas/booking.schema')
const validatorHandler = require('../middlewares/validators.handler')

const router = express.Router()
const service = new BookingService()

router.get('/', async (req, res) => {
  const bookings = await service.findAll()
  res.json({
    data: bookings,
    message: 'Obteniendo las reservas'
  })
})

router.get('/:id_booking',
  validatorHandler(getBookingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_booking } = req.params
      const booking = await service.findOne(id_booking)

      res.json({
        data: booking,
        message: `Obtener one Reservas ${id_booking}`
      })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createBookingSchema, 'body'),
  async (req, res) => {
    const data = req.body

    const bookingCreated = await service.create(data)

    if (bookingCreated) {
      res.status(201).json({
        data: bookingCreated,
        message: `Created Reservas`
      })
    }
  }
)

router.patch('/:id_booking',
  validatorHandler(getBookingSchema, 'params'),
  validatorHandler(updateBookingSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_booking } = req.params
      const data = req.body

      const booking = await service.update(id_booking, data)

      res.json({
        data: booking,
        message: `Actualizando parcialmente la Reservas ${id_booking}`
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id_booking',
  validatorHandler(getBookingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_booking } = req.params

      const bookingId = await service.delete(id_booking)

      res.json({
        data: bookingId,
        message: `Eliminando la Reservas ${id_booking}`
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router