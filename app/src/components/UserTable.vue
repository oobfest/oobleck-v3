<template lang="pug">
  div

    //- READ
    div(v-show="view=='read'")
      h2 Users
      table.table.table-striped.table-bordered
        thead
          tr
            th Name
        tbody
          tr(v-for="user in users")
            td {{user.name}}
      button.btn.btn-primary(@click="view='create'") Add User

    //- CREATE
    div(v-show="view=='create'")
      p Create user!
      button.btn.btn-secondary(@click="view='read'") Cancel
</template>

<script>
  export default {
    data: function() {
      return {
        view: 'read',
        users: []
      }
    },
    methods: {
    },
    created() {
      this.$http('users')
        .then(data=> this.users = data)
        .catch(error=> alert(error))
    }
  }
</script>
