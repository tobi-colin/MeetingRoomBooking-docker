import Vue from 'vue'
import Vuex from 'vuex'
import { getFilteredBookings } from '../services/api-service'

Vue.use(Vuex)

const state = {
		isSelected: false,
		selectedRoom: {
			"name": null,
			"description": null,
			"capacity": null,
			"equipements": []
		},
		bookings: [],
		rooms: [],
		date: null,
		duration: null,
		capacity: null,
		equipements: []
}

const mutations = {
	ADD_ISSELECTED: (state, isSelected) => {
		state.isSelected = isSelected
	},
	ADD_SELECTEDROOM: (state, selectedRoom) => {
		state.selectedRoom = selectedRoom
	},
	ADD_BOOKINGS: (state, bookings) => {
		state.bookings = bookings
	},
	ADD_ROOMS: (state, rooms) => {
		state.rooms = rooms
	},
	ADD_DATE: (state, date) => {
		state.date = date
	},
	ADD_DURATION: (state, duration) => {
		state.duration = duration
	},
	ADD_CAPACITY: (state, capacity) => {
		state.capacity = capacity
	},
	ADD_EQUIPEMENTS: (state, equipements) => {
		state.equipements = equipements
	}
}

const getters = {
	getIsSelected: state => state.isSelected,
	getSelectedRoom: state => state.selectedRoom,
	getBookings: state => state.bookings,
	getRooms: state => state.rooms,
	getDate: state => state.date,
	getDuration: state => state.duration,
	getCapacity: state => state.capacity,
	getEquipements: state => state.equipements,
	getFilteredRoomsByEquipements: (state) => {
		let res = []
		let test = []
		state.rooms.forEach( (room) => {
			if(state.equipements.length < 1) {
				res.push(room)
			} else {
				state.equipements.forEach( (eq) => {
					room.equipements.forEach( (equipement) => {
						if(eq == equipement.name) {
							test.push(true)
						} 
					})
					if(state.equipements.length == test.length) {
						res.push(room)
						test.length = 0
					}
				})
			}
		})
		return res
	},
	getFilteredRoomsByCapacity: (state) => {
		let res = []
		state.rooms.forEach( (room) => {
			if(room.capacity >= state.capacity) {
				res.push(room)
			}
		})
		return res
	},
	getFilteredRoomsByDate: (state) => {
		let start = store.getters.getStartingTime
		let end = store.getters.getEndingTime
		let filter = { $or: 
										[ 
											{ startingTime: { $gte: start,  $lt: end } },
											{ endingTime: { $gt: start, $lte: end } },
											{ startingTime: { $lte: start }, endingTime: { $gte: end } }
										] 
									}
		getFilteredBookings(filter).then((response) => {
			if(response !== state.bookings) {
				store.commit('ADD_BOOKINGS', response)
			}
		})
	},
	getFilteredRooms: (state, getters) => {
		return getters.getFilteredRoomsByCapacity.filter(n => getters.getFilteredRoomsByEquipements.includes(n))
	},
	getStartingTime: (state) => {
		if (state.date) {
			return Date.parse(state.date)
		} else {
			return 0
		}
	},
	getEndingTime: (state, getters) => {
		let convert = {
			'30min': 1800000,
			'1h00': 3600000,
			'1h30': 5400000,
			'2h00': 7200000
		}
		if(state.duration) {
			return getters.getStartingTime + convert[state.duration]
		} else {
			return getters.getStartingTime + convert['30min']
		}
	}
}

const actions = {
	setIsSelected: (store, isSelected) => {
		store.commit('ADD_ISSELECTED', isSelected)
	},
	setSelectedRoom: (store, selectedRoom) => {
		store.commit('ADD_SELECTEDROOM', selectedRoom)
	},
	setBookings: (store, bookings) => {
		store.commit('ADD_BOOKINGS', bookings)
	},
	setRooms: (store, rooms) => {
		store.commit('ADD_ROOMS', rooms)
	},
	setDate: (store, date) => {
		store.commit('ADD_DATE', date)
	},
	setDuration: (store, duration) => {
		store.commit('ADD_DURATION', duration)
	},
	setCapacity: (store, capacity) => {
		store.commit('ADD_CAPACITY', capacity)
	},
	setEquipements: (store, equipements) => {
		store.commit('ADD_EQUIPEMENTS', equipements)
	}
}

let store = new Vuex.Store({
	state: state,
	mutations: mutations,
	getters: getters,
	actions: actions,
	strict: true
})

export default store