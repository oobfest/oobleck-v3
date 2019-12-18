<template lang="pug">
form
  h2 Log In
  .form-group
    label(for="username") Username
    input#username.form-control(type="text" v-model="username")
  .form-group
    label(for="password") Password
    input#password.form-control(type="password" v-model="password")
  button.btn.btn-primary(@click="login") Log In

</template>

<script>
export default {
  data() {
    return {
      username: "car",
      password: "cat"
    }
  },
  methods: {
    login() {
      let requestData = { name: this.username, password: this.password }
      this.$http('users/login', 'POST', requestData)
        .then(data=> {
          this.$store.commit('logIn')
        })
        .catch(error=> alert(error))
    }
  }
}
</script>
