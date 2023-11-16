const express = require('express')
const UserService = require('../services/user.service')
const validatorHandler = require('../middlewares/validators.handler')
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema
} = require('../schemas/user.schemas')

const router = express.Router()
const userService = new UserService()

router.get('/', async (req, res) => {
  const users = await userService.findAll()
  res.json({
    data: users,
    message: 'Obtener usuarios'
  })
})

router.get('/:id_user',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_user } = req.params
      const user = await userService.findOne(id_user)

      res.json({
        data: user,
        message: `obtener el usuario ${id_user}`
      })
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const data = req.body

    const userCreated = await userService.create(data)

    if (userCreated) {
      res.status(201).json({
        data: userCreated,
        message: "Created",
      })
    }
  }
)

router.patch('/:id_user',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_user } = req.params
      const data = req.body

      const userUpdated = await userService.update(id_user, data)

      res.json({
        data: userUpdated,
        message: `Actualizado el usuario ${id_user}`
      })
    } catch (error) {
      next(error)
    }
  })

router.delete('/:id_user', async (req, res, next) => {
  try {
    const { id_user } = req.params

    const userId = await userService.delete(id_user)

    res.json({
      data: userId,
      message: `Eliminado el usuario ${id_user}`
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router