<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Station F</span>
        <span class="font-weight-light"> - Booking</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://stationf.co/"
        target="_blank"
      >
        <span class="mr-2">Station F</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <SearchRoom/>
      <Rooms/>
    </v-content>
  </v-app>
</template>

<script>
  import SearchRoom from './components/SearchRoom'
  import Rooms from './components/Rooms'

  export default {
    name: 'App',
    components: {
      SearchRoom,
      Rooms
    }
  }
</script>
