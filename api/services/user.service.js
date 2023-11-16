const boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid');

const LIST_USERS = [
  {
    age: 28,
    isBlock: true,
    id_user: uuidv4(),
    last_name: 'Rios',
    first_name: 'Andrey',
    phone: '+573202454540',
  },
  {
    age: 21,
    isBlock: false,
    id_user: uuidv4(),
    last_name: 'Rojas',
    first_name: 'Ximena',
    phone: '+573137759567',
  },
  {
    age: 20,
    isBlock: true,
    id_user: uuidv4(),
    last_name: 'Rios',
    first_name: 'Hall',
    phone: '+573202454540',
  },
  {
    age: 19,
    isBlock: true,
    id_user: uuidv4(),
    last_name: 'Rios',
    first_name: 'Hally',
    phone: '+573202454540',
  }
]

class UserService {

  constructor() {
    this.users = []
    this.generate()
  }

  generate() {
    for (let index = 0; index < LIST_USERS.length; index++) {
      const user = LIST_USERS[index];
      this.users.push(user)
    }
  }

  async create(data) {
    const newUser = {
      id_user: uuidv4(),
      isBlock: false,
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  async findAll() {
    return this.users
  }

  async findOne(id) {
    const user = this.users.find(item => item.id_user === id)
    if (!user) {
      throw new boom.notFound('User not found')
    }
    if (user.isBlock) {
      throw new boom.conflict('User is block')
    }
    return user
  }

  async update(id, data) {
    const userIndex = this.users.findIndex(item => item.id_user === id)

    if (userIndex === -1) {
      throw new boom.notFound('User not found')
    }

    const user = this.users[userIndex]

    this.users[userIndex] = {
      ...user,
      ...data
    }
    return this.users[userIndex]
  }

  async delete(id) {
    const userIndex = this.users.findIndex(item => item.id_user === id)

    if (userIndex === -1) {
      throw new boom.notFound('User not found')
    }

    this.users.splice(userIndex, 1)
    return { id }
  }

}

module.exports = UserService