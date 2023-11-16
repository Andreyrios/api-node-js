const Joi = require('joi')

// const isBlock = Joi.boolean()
const phone = Joi.string()
const last_name = Joi.string()
const first_name = Joi.string()
const id_user = Joi.string().uuid()
const age = Joi.number().integer().min(18)

const createUserSchema = Joi.object({
  age: age.required(),
  phone: phone.required(),
  last_name: last_name.required(),
  first_name: first_name.required(),
})

const updateUserSchema = Joi.object({
  age: age,
  phone: phone,
  last_name: last_name,
  first_name: first_name,
})

const getUserSchema = Joi.object({
  id_user: id_user.required()
})

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema
}