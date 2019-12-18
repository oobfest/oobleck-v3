import Vue from 'vue'
import App from './App.vue'
import Router from './plugins/Router'
import Vuex from './plugins/Vuex'
import Http from './plugins/Http'

Vue.config.productionTip = false

let baseUrl = 'http://localhost:9000/'
Vue.use(Http, baseUrl)

new Vue({
  store: Vuex,
  router: Router,
  render: h => h(App)
}).$mount('#app')
