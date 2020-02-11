<template lang="pug">
  div

    //- READ
    div(v-show="view=='read'")
      h2 Users
      .table-box
        table
          thead
            tr
              th Name
              th Email
              th Role
              th
          tbody
            tr(v-for="user in users")
              td {{user.name}}
              td {{user.email}}
              td {{user.role}}
              td: button.btn.btn-danger(@click="deleteUser(user.id)") Delete
      button.btn.btn-primary(@click="view='create'") Add User

    //- CREATE
    div(v-show="view=='create'")
      h2 Add User
      label Name
      input(type='text' v-model="newUser.name")
      label Email
      input(type='text' v-model="newUser.email")
      label Role
      select(v-model="newUser.roleId")
        option(v-for="role in userRoles" :value="role.id") {{role.name}}
      .checkbox
        label
          input(type="checkbox" v-model="newUser.sendEmail")
          | Send email
      button.btn.btn-primary(@click="addUser") Add
      | &nbsp;
      button.btn.btn-secondary(@click="view='read'") Cancel

</template>

<script>
  export default {
    data: function() {
      return {
        view: 'read',
        users: [],
        userRoles: [],
        newUser: {
          name: "",
          email: "",
          roleId: null,
          sendEmail: false
        }
      }
    },
    methods: {
      addUser() {
        this.$http('public/users/unique', 'POST', {email: this.newUser.email})
          .then(response=> {
            if(!response.unique) throw new Error("Email already used")
          })
          .then(()=> this.$http('private/users', 'POST', this.newUser))
          .then(response=> {
            this.users.push(response)
            this.newUser.name = ""
            this.newUser.email = ""
            this.newUser.roleId = null
            this.newUser.sendEmail = false
            this.view = 'read'
          })
          .catch(error=> alert(error))
      },
      deleteUser(id) {
        this.$http('private/users/' + id, 'DELETE')
          .then(response=> {
            this.users.splice(this.users.findIndex(u=>u.id==id), 1)
          })
          .catch(error=> alert(error))
      },
      resetPassword(email) {
        this.$http('public/users/reset-password', 'POST', {email})
          .then(response=> console.log("Done", response))
          .catch(error=> alert(error))
      }
    },
    created() {
      this.$http('private/users')
        .then(data=> this.users = data)
        .catch(error=> alert(error))

      this.$http('private/user-roles')
        .then(data=> this.userRoles = data)
        .catch(error=> alert(error))
    }
  }
</script>
