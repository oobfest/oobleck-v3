import Vue from 'vue'
import Vuex from './Vuex'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../views/Home.vue'),
    meta: {
      auth: false,
    },
  },
  {
    path: '/acts',
    name: 'Acts',
    component: ()=> import('../views/Acts.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/act/:slug',
    name: 'Act',
    component: ()=> import('../views/Act.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/act-roles',
    name: 'Act Roles',
    component: ()=> import('../views/ActRoles.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/act-types',
    name: 'Act Types',
    component: ()=> import('../views/ActTypes.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/cats',
    name: 'Cats',
    component: ()=> import('../views/Cats.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/days',
    name: 'Days',
    component: ()=> import('../views/Days.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/not-authorized',
    name: 'Not Authorized',
    component: ()=> import('../views/401.vue'),
    meta: {
      auth: false,
      //allowed: ['admin', 'staff', 'panelist', 'standup-panelist']
    },
  },
  {
    path: '/people',
    name: 'People',
    component: ()=> import('../views/People.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: ()=> import('../views/Person.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: ()=> import('../views/Reviews.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/review',
    name: 'Review',
    component: ()=> import('../views/Review.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff', 'panelist', 'standup-panelist']
    },
  },
  {
    path: '/shows',
    name: 'Shows',
    component: ()=> import('../views/Shows.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/stages',
    name: 'Stages',
    component: ()=> import('../views/Stages.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/social-media-types',
    name: 'Social Media Types',
    component: ()=> import('../views/SocialMediaTypes.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: ()=> import('../views/Users.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/venues',
    name: 'Venues',
    component: ()=> import('../views/Venues.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: ()=> import('../views/Workshops.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/workshop/:slug',
    name: 'Workshop',
    component: ()=> import('../views/Workshop.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: ()=> import('../views/Test.vue'),
    meta: {
      auth: true,
      allowed: ['admin', 'staff']
    },
  },
  {
    path: '*',
    name: 'Not Found',
    component: ()=> import('../views/404.vue'),
    meta: {
      auth: false
    }
  }
]

let router = new VueRouter({routes})

router.beforeEach((to, from, next)=> {
  if(!to.meta.auth) next()
  else if (to.meta.allowed.includes(Vuex.state.role)) next()
  else next('/not-authorized')
})

router.onError(error=>{
  console.log(error)
  alert("Error!")
})

export default router
