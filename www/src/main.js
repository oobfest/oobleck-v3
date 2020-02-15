import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import http from './plugins/http'

Vue.config.productionTip = false

let apiUrl = process.env.VUE_APP_API_URL
Vue.use(http, apiUrl)

let render = h=>h(App)

new Vue({ router, store, render }).$mount('#app')
