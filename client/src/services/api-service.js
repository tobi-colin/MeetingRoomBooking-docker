import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export { getRooms, getFilteredBookings , addBooking }

function getRooms() {
	const url = `${BASE_URL}/rooms`
	return axios.get(url).then((response) => response.data)
}

// function getBookings() {
// 	const url = `${BASE_URL}/bookings`
// 	return axios.get(url).then((response) => response.data)
// }

function getFilteredBookings(filter) {
	const url = `${BASE_URL}/filteredBookings`
	return axios.post(url, filter).then((response) => response.data)
}

function addBooking(booking) {
	const url = `${BASE_URL}/bookings`
	return axios.post(url, booking).then((response) => response.data)
}



