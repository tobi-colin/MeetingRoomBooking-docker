'use strict'
module.exports = function(app) {
  let booking = require('../controllers/bookingController')

  app.route('/bookings')
    .get(booking.getBookings)
    .post(booking.addBooking)

  app.route('/filteredBookings')
    .post(booking.getFilteredBookings)
}