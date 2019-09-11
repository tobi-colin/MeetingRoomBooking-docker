'use strict'
const mongoose = require('mongoose')
const booking = mongoose.model('booking')

exports.getBookings = function(req, res) {
	booking.find({}, function(err, booking) {
		if (err)
			res.send(err)
		res.json(booking)
	})
}

exports.getFilteredBookings = function(req, res) {
	booking.distinct('roomName', req.body,  function(err, bookings) {
		if (err)
			res.send(err)
		res.json(bookings)
	})
}

exports.addBooking = function(req, res) {
	let newBooking = new booking(req.body)
	newBooking.save(function(err, booking) {
		if (err)
			res.send(err)
		res.json(booking)
	})
}

// exports.updateBooking = function(req, res) {
// 	booking.findOneAndUpdate({_id: req.params.bookingId}, req.body, {new: true}, function(err, booking) {
// 		if (err)
// 			res.send(err)
// 		res.json(booking)
// 	})
// }

// exports.deleteBooking = function(req, res) {
// 	booking.remove({_id: req.params.bookingId}, function(err) {
// 		if (err)
// 			res.send(err)
// 		res.json({ message: 'Booking successfully deleted' })
// 	})
// }