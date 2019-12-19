<template lang="pug">
form
  h2 Log In
  .form-group
    label(for="email") Email
    input#email.form-control(type="text" v-model="email")
  .form-group
    label(for="password") Password
    input#password.form-control(type="password" v-model="password")
  button.btn.btn-primary(@click="login") Log In

</template>

<script>
export default {
  data() {
    return {
      email: "car",
      password: "cat"
    }
  },
  methods: {
    login() {
      let requestData = { email: this.email, password: this.password }
      this.$http('users/login', 'POST', requestData)
        .then(data=> {
          this.$store.commit('logIn')
        })
        .catch(error=> alert(error))
    }
  }
}
</script>
