<template lang="pug">
  #app
    div(v-if="$store.state.loggedIn")
      nav
        ul#nav.list-inline
          page-link(v-for="route in routes" v-bind:to="route" :key="route")
          li: a(href="#" @click="logout") Log Out
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
      routes: ['/', '/cats', '/users']
    }
  },
  created() {
    // Check if logged in!
    fetch('http://localhost:9000/users/check', {credentials: 'include'})
      .then(response=> {
        if (response.ok) this.$store.commit('logIn')
        else this.$store.commit('logOut')
      })
      .catch(error=> alert("Logged out"))
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
