'use strict'
module.exports = function(app) {
	let room = require('../controllers/roomController')
	
  app.route('/rooms')
    .get(room.getRooms)
}