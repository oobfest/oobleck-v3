import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: null,
    username: null
  },
  mutations: {
    setUser(state, payload) {
      state.role = payload.role
      state.username = payload.name
    },
    logOut(state) {
      state.role = null
      state.username = null
    }
  },
  actions: { },
  modules: { }
})
