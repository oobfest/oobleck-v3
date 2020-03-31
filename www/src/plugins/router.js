import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Apply from '../views/Apply.vue'
import About from '../views/About.vue'
import Jobs from '../views/Jobs.vue'

import VolunteerCoordinator from '../views/jobs/VolunteerCoordinator.vue'
import SpecialTechCoordinator from '../views/jobs/SpecialTechCoordinator.vue'
import MarketingDirector from '../views/jobs/MarketingDirector.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/apply',
    name: 'apply',
    component: Apply
  },
  /*
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: Jobs,
    children: [
      {
        path: 'volunteer-coordinator',
        component: VolunteerCoordinator
      },
      {
        path: 'special-tech-coordinator',
        component: SpecialTechCoordinator
      },
      {
        path: 'marketing-director',
        component: MarketingDirector
      }
    ]
  },
  */
]

export default new VueRouter({ routes })
