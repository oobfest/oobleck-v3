import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: null,
    username: null,
    userId: null,
    acts: []
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
    },
    setActs(state, payload) {
      state.acts = payload
    }
  },
  actions: { 
    loadActs({commit}) {
      if(this.state.acts.length==0) {
        let $http = this._vm.$http
        $http('private/acts')
          .then(data=> commit('setActs', data))
          .catch(error=> alert(error))
      }
    }
  },
  modules: { }
})
