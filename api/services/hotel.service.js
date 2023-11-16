const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');

const LIST_HOTELS = [
  {
    available: false,
    id_hotel: uuidv4(),
    phone: '6063265151',
    company: 'Tequendama',
    address: 'calle 35 #8-03',
  },
  {
    available: true,
    id_hotel: uuidv4(),
    phone: '6063265151',
    company: 'Coordillera',
    address: 'calle 35 #8-03',
  }
]

class HotelService {
  constructor() {
    this.hotels = []
    this.generate()
  }

  generate() {
    for (let index = 0; index < LIST_HOTELS.length; index++) {
      const hotel = LIST_HOTELS[index];
      this.hotels.push(hotel)
    }
  }

  async create(data) {
    const newHotel = {
      id_hotel: uuidv4(),
      available: true,
      ...data
    }

    this.hotels.push(newHotel)
    return newHotel
  }

  async findAll() {
    return this.hotels
  }

  async findOne(id) {
    const hotel = this.hotels.find(item => item.id_hotel === id)

    if (!hotel) {
      throw new boom.notFound('Hotel not found')
    }
    if (!hotel.available) {
      throw new boom.conflict('Hotel not available')
    }
    return hotel
  }

  async update(id, data) {
    const indexHotel = this.hotels.findIndex(item => item.id_hotel === id)

    if (indexHotel === -1) {
      throw new boom.notFound('Object not found')
    }

    const hotel = this.hotels[indexHotel]

    this.hotels[indexHotel] = {
      ...hotel,
      ...data
    }
    return this.hotels[indexHotel]
  }

  async delete(id) {
    const indexHotel = this.hotels.findIndex(item => item.id_hotel === id)

    if (indexHotel === -1) {
      throw new boom.notFound('Object not found')
    }

    this.hotels.splice(indexHotel, 1)

    return { id }
  }
}

module.exports = HotelService