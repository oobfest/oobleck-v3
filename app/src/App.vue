<template lang="pug">
  #app

    //- If Logged In
    .container(v-if="$store.state.role")
      nav.sidebar
        img.logo(src="/images/oob-logo-fire.jpg")
        .sidebar-navigation
          page-link(v-for="route in routes" :to="route.path" :roles="route.roles" :key="route.path")
      header.topbar
        p {{$store.state.username}}  ({{$store.state.role}}) | 
          a(href="/" @click.prevent="logout") logout
      main.main
        router-view

    //- If Not Logged In
    .container(v-else)
      nav.sidebar
      header.topbar
      main.main
        login-form

</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import PageLink from '@/components/PageLink.vue'

export default {
  components: { LoginForm, PageLink },
  data() {
    return {
      routes: [
        { path: '/', roles: ['admin', 'staff', 'panelist']},
        { path: '/acts', roles: ['admin', 'staff']},
        { path: '/act-roles', roles: ['admin']},
        { path: '/act-types', roles: ['admin']},
        { path: '/cats', roles: []},
        { path: '/days', roles: ['admin']},
        { path: '/people', roles: ['admin', 'staff']},
        { path: '/review', roles: ['staff', 'panelist', 'standup-panelist'] },
        { path: '/reviews', roles: ['admin', 'staff'] },
        { path: '/shows', roles: ['admin']},
        { path: '/stages', roles: ['admin']},
        { path: '/social-media-types', roles: ['admin']},
        { path: '/users', roles: ['admin']},
        { path: '/venues', roles: ['admin']},
        { path: '/workshops', roles: ['admin']},
        { path: '/test', roles: ['admin']}
      ]
    }
  },
  methods: {
    logout() {
      this.$http('public/users/logout')
        .then(data=> {
          this.$store.commit('logOut')
        })
        .catch(error=>console.error(error))
      }
    }
}


</script>

<style lang="scss">
</style>
