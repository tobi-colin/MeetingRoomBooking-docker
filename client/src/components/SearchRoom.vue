<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <Calendar/>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="duration"
          class="v-text-field--box"
          :items="itemsDuration"
          label="Durée"
          background-color="white"
          color="black"
          item-color="black"
          height="49px"
          outlined/>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="capacity"
          class="v-text-field--box"
          label="Capacité"
          type="number"
          background-color="white"
          color="black"
          height="49px"
          outlined/>
      </v-col>
      <v-col cols="12" sm="3">
        <v-combobox
          v-model="equipements"
          class="v-combo-box--box"
          :items="itemsEquip"
          label="Équipements"
          background-color="white"
          item-color="black"
          color="black"
          height="48px"
          multiple
          chips
          outlined/>
      </v-col>
    </v-row>
    <v-divider/>
  </v-container>
</template>

<script>
  import Calendar from './Calendar'
  import store from './Store'

  export default {
    name: 'SearchRoom',
    components: { Calendar },
    data() {
      return {
        itemsEquip: ['TV', 'Retro Projecteur'],
        itemsDuration: ['30min', '1h00', '1h30', '2h00']
      }
    },
    computed: {
      duration: {
        get: () => { return store.getters.getDuration },
        set: (duration) => { store.commit('ADD_DURATION', duration) }
      },
      capacity: {
        get: () => { return store.getters.getCapacity },
        set: (capacity) => { store.commit('ADD_CAPACITY', capacity) }
      },
      equipements: {
        get: () => { return store.getters.getEquipements },
        set: (equipements) => { store.commit('ADD_EQUIPEMENTS', equipements) }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .v-text-field--box .v-input__slot, .v-text-field--outline .v-input__slot {
    min-height: auto!important;
    align-content: center!important;
  }
  .v-combo-box--box .v-input__slot, .v-combo-box--outline .v-input__slot {
    min-height: auto!important;
    align-content: center!important;
  }
</style>
