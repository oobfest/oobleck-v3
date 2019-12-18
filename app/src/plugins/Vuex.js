import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    loggedIn: false
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    logIn(state) {
      state.loggedIn = true
    },
    logOut(state) {
      state.loggedIn = false
    }
  },
  actions: {

  },
  modules: {
  }
})
