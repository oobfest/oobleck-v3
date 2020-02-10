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
    path: '/acts',
    name: 'Acts',
    component: ()=> import('../views/Acts.vue'),
  },
  {
    path: '/act/:slug',
    name: 'Act',
    component: ()=> import('../views/Act.vue')
  },
  {
    path: '/act-roles',
    name: 'Act Roles',
    component: ()=> import('../views/ActRoles.vue'),
  },
  {
    path: '/act-types',
    name: 'Act Types',
    component: ()=> import('../views/ActTypes.vue'),
  },
  {
    path: '/cats',
    name: 'Cats',
    component: ()=> import('../views/Cats.vue'),
  },
  {
    path: '/days',
    name: 'Days',
    component: ()=> import('../views/Days.vue'),
  },
  {
    path: '/people',
    name: 'People',
    component: ()=> import('../views/People.vue'),
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: ()=> import('../views/Person.vue'),
  },
  {
    path: '/shows',
    name: 'Shows',
    component: ()=> import('../views/Shows.vue'),
  },
  {
    path: '/stages',
    name: 'Stages',
    component: ()=> import('../views/Stages.vue'),
  },
  {
    path: '/social-media-types',
    name: 'Social Media Types',
    component: ()=> import('../views/SocialMediaTypes.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: ()=> import('../views/Users.vue'),
  },
  {
    path: '/venues',
    name: 'Venues',
    component: ()=> import('../views/Venues.vue'),
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: ()=> import('../views/Workshops.vue'),
  },
  {
    path: '/workshop/:slug',
    name: 'Workshop',
    component: ()=> import('../views/Workshop.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: ()=> import('../views/Test.vue'),
  },
]

let router = new VueRouter({routes})

export default router
