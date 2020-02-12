import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: null,
    username: null,
    userId: null
  },
  mutations: {
    setUser(state, payload) {
      state.role = payload.role
      state.username = payload.name
      state.userId = payload.id
    },
    logOut(state) {
      state.role = null
      state.username = null
      state.userId = null
    }
  },
  actions: { },
  modules: { }
})
