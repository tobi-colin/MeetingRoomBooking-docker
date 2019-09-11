'use strict'
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookingSchema = new Schema({
  roomName: {
    type: String,
    default: 'roomName'
  },
  startingTime: {
    type: Number,
    default: '0'
  },
  endingTime: {
    type: Number,
    default: '0'
  }
})
module.exports = mongoose.model('booking', bookingSchema) 