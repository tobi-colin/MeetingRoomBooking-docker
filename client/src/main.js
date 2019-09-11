import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
