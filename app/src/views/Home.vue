<template lang="pug">
div
  h1 Welcome to OoB!
  p: a(href="#" @click.prevent='showChangePassword=true' v-show='!showChangePassword') Change Password
  div(v-if="showChangePassword")
    h2 Change Password
    label Old Password
    input(type='password' v-model="oldPassword")
    label New Password
    input(type='password' v-model="newPassword")
    p
      button.primary(@click="changePassword") Change Password
      | 
      button(@click="showChangePassword=false") Cancel
</template>

<script>
export default {
  data() {
    return {
      showChangePassword: false,
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    changePassword() {
      this.$http('private/users/change-password', 'POST', {name: this.$store.state.username, oldPassword: this.oldPassword, newPassword: this.newPassword}) 
        .then(response=> {
          this.oldPassword = ''
          this.newPassword = ''
          this.showChangePassword = false
          alert("Your password has been changed")
        })
        .catch(error=> {
          alert("Something went wrong :(")
          console.log(error)
        })
    }
  }
}
</script>
