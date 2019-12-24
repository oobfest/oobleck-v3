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
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/cats',
    name: 'Cats',
    component: () => import('../views/Cats.vue'),
  }
]

let router = new VueRouter({routes})

router.beforeEach((to, from, next)=> {
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
})

export default router
