<template lang="pug">
div

  //- LOGIN
  form(v-if="state=='login'")
    h2 Log In
    label(for="email") Email
    input#email(type="text" v-model="email")
    label(for="password") Password
    input#password(type="password" v-model="password")
    .text-right
      small: a(href="#" @click="state='forgot-password'") Forgot password?
    button(@click="login") Log In

  //- FORGOT PASSWORD
  form(v-else-if="state=='forgot-password'")
    h2 Forgot Password
    p A new password will be emailed to you.
    .form-group
      label(for="reset-email") Email
      input#reset-email.form-control(type="text" v-model="email")
    button.btn.btn-primary(@click="resetPassword") Reset Password
    | &nbsp;
    button.btn.btn-secondary(@click="state='login'") Cancel

  //- FORGOT PASSWORD SUBMITTED
  form(v-else-if="state=='forgot-password-submitted'")
    h2 Forgot Password
    p An email has been sent to 
      code {{email}}
    button.btn.btn-primary(@click="state='login'") Back

</template>

<script>
export default {
  data() {
    return {
      state: 'login',
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      let requestData = { email: this.email, password: this.password }
      this.$http('public/users/login', 'POST', requestData)
        .then(user=> {
          localStorage.setItem('role', user.role)
          localStorage.setItem('username', user.name)
          localStorage.setItem('userId', user.id)
          this.$store.commit('setUser', user)
        })
        .catch(error=> alert(error))
    },
    resetPassword() {
      this.$http('public/users/reset-password', 'POST', {email: this.email})
        .then(data=> {
          this.state='forgot-password-submitted'
        })
        .catch(error=> alert(error))
    }
  }
}
</script>
