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
    path: '/act-types',
    name: 'Act Types',
    component: () => import('../views/ActTypes.vue'),
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
    path: '/social-media-types',
    name: 'Social Media Types',
    component: () => import('../views/SocialMediaTypes.vue'),
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

export default router
