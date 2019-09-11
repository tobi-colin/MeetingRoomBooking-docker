<template>
  <v-container>
    <v-alert
      v-model="warning"
      :dismissible="true"
      type="warning"
      class="mb-4"
      dense
    >
      Veuillez renseigner l'heure de début et la durée de la réunion avant de passer à la réservation.
    </v-alert>
    <SelectedRoom v-if="$store.state.isSelected"/>
    <v-row v-if="filteredRooms[0]">
      <v-col
        v-for="room in filteredRooms"
        :key="room.name"
        cols="6"
      >
        <v-hover>
        <template v-slot="{ hover }">
        <v-card :elevation="hover ? 24 : 1" @click="dialog(room)">
          <v-card-title
            style="background-color: black; color: white; opacity: 0.9; padding-top: 5%;"
            class="fill-height"
            v-text="room.name"/>
          <v-divider/>
          <v-card-text v-text="'Description : ' + room.description"/>
          <v-card-text v-text="'Capacité : ' + room.capacity"/>
          <v-card-text>
            Équipements :
            <ul v-if="room.equipements[0]">
              <li v-for="equipement in room.equipements" v-bind:key="equipement.name">
                {{ equipement.name }}
              </li>
            </ul>
            <ul v-else>
              <v-icon small>mdi-thumb-down</v-icon>
              Pas d'équipement
            </ul>
          </v-card-text>
        </v-card>
        </template>
        </v-hover>
      </v-col>
    </v-row>
    <div v-else>
      <v-alert
        v-model="info"
        :dismissible="true"
        type="info"
        class="mb-4"
        dense
      >
        Aucune salle de disponible selon vos critères.
      </v-alert>
    </div>
  </v-container>
</template>

<script>
  import SelectedRoom from './SelectedRoom'
  import store from './Store'
  import { getRooms } from '../services/api-service'

  export default {
    name: 'Rooms',
    components: { SelectedRoom },
    mounted() {
      getRooms().then(response => (this.rooms = response.rooms))
    },
    data () {
      return {
        warning: false,
        info: false
      }
    },
    store: store,
    methods: {
      dialog(room) {
        if(store.getters.getStartingTime !== 0 && store.getters.getDuration) {
          this.warning = false
          store.commit('ADD_SELECTEDROOM', room)
          store.commit('ADD_ISSELECTED', !store.getters.getIsSeleted)
        } else {
          this.warning = true
        }
      }
    },
    computed: {
      isSelected: {
        get: () => { return store.getters.getIsSeleted },
        set: (isSelected) => { return store.setIsSelected(isSelected) }
      },
      selectedRoom: {
        get: () => { return store.getters.getSelectedRoom },
        set: (selectedRoom) => { return store.actions.setSelectedRoom(selectedRoom) }
      },
      rooms: {
        get: () => { return store.getters.getRooms },
        set: (rooms) => { store.commit('ADD_ROOMS', rooms) }
      },
      filteredRoomsByCapacity: {
        get: () => { return store.getters.getFilteredRoomsByCapacity }      
      },
      filteredRoomsByEquipements: {
        get: () => { return store.getters.getFilteredRoomsByEquipements } 
      },
      filteredRoomsByDate: {
        get: () => { store.getters.getFilteredRoomsByDate }
      },
      filteredRooms: {
        get() { 
          store.getters.getFilteredRoomsByDate
          let res = []
          store.getters.getFilteredRooms.forEach(room => {
            if(!store.state.bookings.includes(room.name)) {
              res.push(room)
            }
          }) 
          if(res[0] !== undefined) {
            this.info = true
          }
          return res
        } 
      },
      startingTime: {
        get: () => { return store.getters.getStartingTime } 
      },
      endingTime: {
        get: () => { return store.getters.getEndingTime } 
      }
    }
  }
</script>
