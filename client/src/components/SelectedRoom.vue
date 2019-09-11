<template>
  <v-dialog @click:outside="exit" value="true" width="500">
    <v-card>
      <v-card-title
        class="fill-height"
        v-text="$store.state.selectedRoom.name"/>
      <v-divider/>
      <v-card-text style="background-color: black; color: white; opacity: 0.87; padding-top: 5%;">
        Réservation le : {{ new Date($store.getters.getStartingTime).toLocaleString() }}
        jusqu'à {{ new Date($store.getters.getEndingTime).toLocaleTimeString() }} <br>
        Durée de la réunion : {{ $store.getters.getDuration }}
      </v-card-text>
      <transition name="bounce">
        <v-alert
          v-if="success"
          type="success"
          class="mb-4"
          dense
          tile
        >
          Votre réservation a bien été enregistrée.
        </v-alert>
      </transition>
      <br>
      <v-card-text v-text="'Description : ' + $store.state.selectedRoom.description"/>
      <v-card-text v-text="'Capacité : ' + $store.state.selectedRoom.capacity"/>
      <v-card-text>
        Équipements :
        <ul v-if="$store.state.selectedRoom.equipements[0]">
          <li v-for="equipement in $store.state.selectedRoom.equipements" v-bind:key="equipement.name">
            {{ equipement.name }}
          </li>
        </ul>
        <ul v-else>
          <v-icon small>mdi-thumb-down</v-icon>
          Pas d'équipement
        </ul>
      </v-card-text>
      <v-card-actions >
        <v-row v-if="!success">
          <v-col cols="6">
            <v-btn tile dark block @click="book($store.state.selectedRoom.name)">
              Réserver cette salle
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn tile block @click="exit">
              Annuler
            </v-btn>
          </v-col>
        </v-row>
        <v-col v-else>
          <v-btn tile dark block @click="exit">
            Retour
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import store from './Store'
  import { addBooking } from '../services/api-service'

  export default {
    name: 'SelectedRoom',
    store: store,
    data () {
      return {
        success: false
      }
    },
    methods: {
      book(room_name) {
        if(store.getters.getStartingTime !== 0 && store.getters.getDuration) {
          let booking = {
            roomName: room_name,
            startingTime: store.getters.getStartingTime,
            endingTime: store.getters.getEndingTime
          }
          addBooking(booking).then(data => {
            console.log(data)
          }).then(this.success = true)
        } 
        else {
          store.commit('ADD_ISSELECTED', !store.getters.getIsSelected)
        }
      },
      exit() { 
        store.commit('ADD_DURATION', null)
        store.commit('ADD_DATE', null)
        store.commit('ADD_ISSELECTED', !store.getters.getIsSelected) 
      }
    }
  }
</script>


<style>
  .bounce-enter-active {
  animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>