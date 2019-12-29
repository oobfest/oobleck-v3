import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../views/Home.vue'),
  },
  {
    path: '/cats',
    name: 'Cats',
    component: () => import('../views/Cats.vue'),
  },
  {
    path: '/days',
    name: 'Days',
    component: () => import('../views/Days.vue'),
  },
  {
    path: '/stages',
    name: 'Stages',
    component: () => import('../views/Stages.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/venues',
    name: 'Venues',
    component: () => import('../views/Venues.vue'),
  },
]

let router = new VueRouter({routes})

router.beforeEach((to, from, next)=> {
  if(to.path != '/') {
    // Check if logged in
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
  // Todo: not there yet!!
})

export default router
