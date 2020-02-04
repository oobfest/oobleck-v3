import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'

Vue.config.productionTip = false
let render = h=>h(App)

new Vue({ router, store, render }).$mount('#app')
