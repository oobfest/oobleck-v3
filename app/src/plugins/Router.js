import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import('../views/Home.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/cats',
    name: 'cats',
    component: () => import('../views/Cats.vue')
  }
]

let router = new VueRouter({routes})
let protectedRoutes = ['cats', 'users']

router.beforeEach((to, from, next)=> {
  if(protectedRoutes.includes(to.name)) {
    fetch('http://localhost:9000/users/check', {credentials: 'include'})
      .then(response=> {
        if (response.ok) next()
        else window.location.href="/"
      })
      .catch(error=> {
        console.log("BORQE")
        window.location.href="/"
      })
  }
  else next()
})

export default router
