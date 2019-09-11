<template>
  <div 
    id="vueCtkDateTimePicker"
    class="ctk-date-time-picker">
      <CtkDateTimePicker
        v-model="date"
        color="black"
        locale="fr"
        label="Date & heure de début de réunion"
        :no-weekends-days=true
        :format="'YYYY-MM-DD HH:mm'"
        :min-date="this.currentDate()"
        :disabledHours="disabledHours"
        minute-interval="10"
        input-size="lg"
        no-button-now
      />
  </div>
</template>

<script>
  import CtkDateTimePicker from 'vue-ctk-date-time-picker'
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
  import store from './Store'

  export default {
    name: 'Calendar',
    components: { CtkDateTimePicker },
    data () {
      return {
        currentDate: () => {
          let timezoneOffset = new Date().getTimezoneOffset() * 60000
          return new Date(Date.now() - timezoneOffset).toISOString().slice(0, 16).replace(/T/, ' ')
        },
        disabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '21', '22', '23']
      }
    },
    computed: {
      date: {
        get: () => { return store.getters.getDate },
        set: (date) => { store.commit('ADD_DATE', date) }
      }
    }
  }
</script>
