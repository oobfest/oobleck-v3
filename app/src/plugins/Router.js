import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../views/Home.vue'),
    meta: { roles: ['admin', 'staff', 'panelist'] }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
    meta: { roles: ['admin'] }
  },
  {
    path: '/cats',
    name: 'Cats',
    component: () => import('../views/Cats.vue'),
    meta: { roles: ['admin', 'staff'] }
  }
]

let router = new VueRouter({routes})
let protectedRoutes = ['Cats', 'Users']

router.beforeEach((to, from, next)=> {
  if(protectedRoutes.includes(to.name)) {
    fetch('http://localhost:9000/users/check', {credentials: 'include'})
      .then(response=> {
        if (response.ok) next()
        else next('/')
      })
      .catch(error=> {
        alert("Error on credentials check for routes")
        next('/')
      })
  }
  else next()
})

export default router
