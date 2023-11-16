const express = require('express')
const HotelService = require('../services/hotel.service')
const { getHotelSchema,
  createHotelSchema,
  updateHotelSchema } = require('../schemas/hotel.schema')
const validatorHandler = require('../middlewares/validators.handler')

const router = express.Router()
const service = new HotelService()

router.get('/', async (req, res) => {

  const hotels = await service.findAll()
  res.json({
    data: hotels,
    message: 'Obtener hoteles'
  })
})

router.get('/:id_hotel',
  validatorHandler(getHotelSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_hotel } = req.params
      const hotel = await service.findOne(id_hotel)

      res.json({
        data: hotel,
        message: `Obtener one hotel ${id_hotel}`
      })
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  validatorHandler(createHotelSchema, 'body'),
  async (req, res) => {
    const data = req.body

    const hotelCreated = await service.create(data)

    if (hotelCreated) {
      res.status(201).json({
        data: hotelCreated,
        message: `Created hotel`
      })
    }
  })

router.patch('/:id_hotel',
  validatorHandler(getHotelSchema, 'params'),
  validatorHandler(updateHotelSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_hotel } = req.params
      const data = req.body

      const hotel = await service.update(id_hotel, data)

      res.json({
        data: hotel,
        message: `Actualizando parcialmente el hotel ${id_hotel}`
      })
    } catch (error) {
      next(error)
    }
  })

router.delete('/:id_hotel',
  validatorHandler(getHotelSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_hotel } = req.params

      const hotelId = await service.delete(id_hotel)

      res.json({
        data: hotelId,
        message: `Eliminando el hotel ${hotelId}`
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router