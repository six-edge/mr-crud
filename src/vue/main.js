import Vue from 'vue'
import Vuetify from 'vuetify'
import VueWebsocket from 'vue-native-websocket'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: "#FF6D00",
    secondary: "#E65100",
    accent: "#FF9100",
    error: "#BF360C",
    warning: "#FDD835",
    info: "#607D8B",
    success: "#33691E"
  }
})

Vue.use(VueWebsocket, 'ws://localhost:5050', {
  store: store,
  reconnection: true,
  // connectManually: true,
  // format: 'json'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
