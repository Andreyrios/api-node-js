const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom')

const LIST_BOOKINGS = [
  {
    id_booking: uuidv4(),
    name_user: 'Lian Henao',
  },
  {
    id_booking: uuidv4(),
    name_user: 'Sheryck Henao',
  }
]

class BookingService {
  constructor() {
    this.bookings = []
    this.generate()
  }

  generate() {
    for (let index = 0; index < LIST_BOOKINGS.length; index++) {
      const booking = LIST_BOOKINGS[index];
      this.bookings.push(booking)
    }
  }

  async create(data) {

    const newBooking = {
      id_booking: uuidv4(),
      ...data
    }

    this.bookings.push(newBooking)
    return newBooking
  }

  async findAll() {
    return this.bookings
  }

  async findOne(id) {
    const booking = this.bookings.find(item => item.id_booking === id)

    if (!booking) {
      throw boom.notFound('Object not found')
    }

    return booking
  }

  async update(id, data) {
    const bookingIndex = this.bookings.findIndex(item => item.id_booking === id)

    if (bookingIndex === -1) {
      throw boom.notFound('Object not found')
    }

    const booking = this.bookings[bookingIndex]

    this.bookings[bookingIndex] = {
      ...booking,
      ...data
    }

    return this.bookings[bookingIndex]
  }

  async delete(id) {
    const bookingIndex = this.bookings.findIndex(item => item.id_booking === id)

    if (bookingIndex === -1) {
      throw boom.notFound('Object not found')
    }

    this.bookings.splice(bookingIndex, 1)

    return { id }
  }

}
module.exports = BookingService