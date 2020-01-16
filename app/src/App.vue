<template lang="pug">
  #app

    //- If Logged In
    .container(v-if="$store.state.role")
      nav.sidebar
        img.logo(src="/images/oob-logo-fire.jpg")
        .sidebar-navigation
          page-link(v-for="route in routes" :to="route.path" :roles="route.roles" :key="route.path")
      header.topbar
        p username | 
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
        { path: '/act-types', roles: ['admin']},
        { path: '/cats', roles: ['admin', 'staff']},
        { path: '/days', roles: ['admin']},
        { path: '/stages', roles: ['admin']},
        { path: '/social-media-types', roles: ['admin']},
        { path: '/users', roles: ['admin']},
        { path: '/venues', roles: ['admin']}
      ]
    }
  },
  created() {
    // Check if logged in!
    /*
    fetch('http://localhost:9000/users/check', {credentials: 'include'})
      .then(response=> {
        if (!response.ok) this.$store.commit('logOut')
      })
      .catch(error=> alert("Error checking authentication"))
    */
  },
  methods: {
    logout() {
      this.$http('users/logout')
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
