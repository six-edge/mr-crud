import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TYPES = {
  SET_LOGGED_IN: "SET_LOGGED_IN",
  SET_USER: "SET_USER"
}

export default new Vuex.Store({
  state: {
    user: false,
    loggedIn: false,
    debug: true,
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations:{
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      console.info('Connected!')
    },
    SOCKET_ONCLOSE (state, event)  {
      state.socket.isConnected = false,
      console.info('Disconnected!', event)
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      state.socket.message = message
      console.info('Message:', message)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    [TYPES.SET_LOGGED_IN] (state, value) {
      state.loggedIn = value
    },
    [TYPES.SET_USER] (state, user) {
      state.user = user
    }
  },
  actions: {
    async sendMessage(context, message) {
      Vue.prototype.$socket.send(message)
    },
    async login ({ commit }, user) {
      commit(TYPES.SET_LOGGED_IN, true)
      commit(TYPES.SET_USER, user)
    },
    async logout ({ commit }) {
      commit(TYPES.SET_LOGGED_IN, false)
      commit(TYPES.SET_USER, false)
    }
  }
})
