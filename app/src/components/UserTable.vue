<template lang="pug">
  div

    //- READ
    div(v-show="view=='read'")
      h2 Users
      table.table.table-striped.table-bordered
        thead
          tr
            th Name
            th
        tbody
          tr(v-for="user in users")
            td {{user.name}}
            td: button.btn.btn-danger(@click="deleteUser(user.id)") Delete
      button.btn.btn-primary(@click="view='create'") Add User

    //- CREATE
    div(v-show="view=='create'")
      h2 Add User
      form
        .form-group
          label(for="new-user") Username
          input#user-name.form-control(type='text' v-model="newUser.name")
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
        newUser: {
          name: ""
        }
      }
    },
    methods: {
      addUser() {
        this.$http('users', 'POST', this.newUser)
          .then(response=> {
            this.users.push(response)
            this.newUser.name = ""
            this.view = 'read'
          })
          .catch(error=> alert(error))
      },
      deleteUser(id) {
        this.$http('users/' + id, 'DELETE')
          .then(response=> {
            this.users.splice(this.users.findIndex(u=>u.id==id), 1)
          })
          .catch(error=> alert(error))
      }

    },
    created() {
      this.$http('users')
        .then(data=> this.users = data)
        .catch(error=> alert(error))
    }
  }
</script>
