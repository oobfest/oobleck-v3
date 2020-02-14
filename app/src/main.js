import Vue from 'vue'
import App from './App.vue'
import Router from './plugins/Router'
import Vuex from './plugins/Vuex'
import Http from './plugins/Http'

Vue.config.productionTip = false

let apiUrl = process.env.VUE_APP_API_URL
Vue.use(Http, apiUrl)

new Vue({
  store: Vuex,
  router: Router,
  render: h => h(App)
}).$mount('#app')
