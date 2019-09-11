'use strict'

require('localenv')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./api/models/bookingModel')


// Constants
const PORT = process.env.PORT


// Mongoose instance connection
// reconnection settings don't seem to work .. :
	// reconnectTries: 5
	// reconnectInterval: 5000
setTimeout(
	() => mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}),
	5000
)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
	console.log("Connection success !")
})


// App
const app = express()
const corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))


// Routers
const bookingRouter = require('./api/routes/bookingRoutes')
const roomRouter = require('./api/routes/roomRoutes')
bookingRouter(app)
roomRouter(app)

app.listen(PORT);
console.log(`Node.js server running on port : ${PORT}`)