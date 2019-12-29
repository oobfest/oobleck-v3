<template lang="pug">
  #app
    div(v-if="$store.state.role")
      nav
        ul#nav.list-inline
          page-link(v-for="route in routes" :to="route.path" :roles="route.roles" :key="route.path")
          li: a(href="/" @click.prevent="logout") Log Out
      router-view
    div(v-else)
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
        { path: '/cats', roles: ['admin', 'staff']},
        { path: '/days', roles: ['admin']},
        { path: '/stages', roles: ['admin']},
        { path: '/users', roles: ['admin']},
        { path: '/venues', roles: ['admin']}
      ]
    }
  },
  created() {
    // Check if logged in!
    fetch('http://localhost:9000/users/check', {credentials: 'include'})
      .then(response=> {
        if (!response.ok) this.$store.commit('logOut')
      })
      .catch(error=> alert("Error checking authentication"))
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
  body { margin: 2em; }
  .active { background-color: yellow }
</style>
