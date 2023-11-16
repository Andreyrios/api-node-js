const Joi = require('joi')

const available = Joi.boolean()
const id_hotel = Joi.string().uuid()
const phone = Joi.string().min(7).max(13)
const company = Joi.string()
const address = Joi.string()

const createHotelSchema = Joi.object({
  phone: phone.required(),
  company: company.required(),
  address: address.required()
})

const updateHotelSchema = Joi.object({
  phone: phone,
  company: company,
  address: address,
  available: available
})

const getHotelSchema = Joi.object({
  id_hotel: id_hotel.required()
})

module.exports = {
  getHotelSchema,
  createHotelSchema,
  updateHotelSchema
}