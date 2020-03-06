import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: localStorage.getItem('role'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    acts: [],
    people: []
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
    },
    setPeople(state, payload) {
      state.people = payload
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
    },
    loadPeople({commit}) {
      if(this.state.people.length==0) {
        let $http = this._vm.$http
        $http('private/people')
          .then(data=> commit('setPeople', data))
          .catch(error=> alert(error))
      }
    }
  },
  modules: { }
})
