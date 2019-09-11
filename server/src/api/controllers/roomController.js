'use strict'
const https = require('https')

exports.getRooms = (req, res) => {
	let rooms = ''
	https.get("https://online.stationf.co/tests/rooms.json", data => {
		data.on('data', (chunk) => {
			rooms += chunk
		})
		data.on('end', () => {
			res.send(rooms)
		})
	}).on("error", (err) => {
		console.log("Error: " + err.message)
	})
}