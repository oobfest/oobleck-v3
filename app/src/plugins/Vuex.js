import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: null
  },
  mutations: {
    setRole(state, payload) {
      state.role = payload.role
    },
    logOut(state) {
      state.role = null
    }
  },
  actions: {

  },
  modules: {
  }
})
