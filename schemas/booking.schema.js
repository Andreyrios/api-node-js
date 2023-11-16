const Joi = require('joi')

const id_booking = Joi.string().uuid()
const name_user = Joi.string()

const createBookingSchema = Joi.object({
  name_user: name_user.required()
})

const updateBookingSchema = Joi.object({
  name_user: name_user
})

const getBookingSchema = Joi.object({
  id_booking: id_booking
})

module.exports = {
  getBookingSchema,
  updateBookingSchema,
  createBookingSchema
}