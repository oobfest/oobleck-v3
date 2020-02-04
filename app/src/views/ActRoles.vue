<template lang="pug">
  div

    //- READ
    div(v-if="view=='read'")
      h2 Act Roles
      p What roles can a person have when associated with an act?
      .table-box
        table
          thead
            tr
              th Name
              th
          tbody
            tr(v-for="actRole in actRoles")
              td {{actRole.name}}
              td
                button.danger(@click="deleteActRole(actRole.id)") Delete
      button.primary(@click="view='create'") Add Act Role

    //- CREATE
    div(v-if="view=='create'")
      h2 Add Act Role
      form
        label Name
        input(type='text' v-model="newActRole.name")
        div
          button.btn.btn-primary(@click="addActRole") Add
          | &nbsp;
          button.btn.btn-secondary(@click="view='read'") Cancel

</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newActRole: { name: "" },
        actRoles: []
      }
    },
    methods: {
      addActRole() {
        if(this.newActRole.name != '') {
          this.$http('private/act-roles', 'POST', this.newActRole)
            .then(data=> {
              this.actRoles.push(data)
              this.newActRole.name = ""
              this.view='read'
            })
        }
        else alert("Name required")
      },
      deleteActRole(id) {
        this.$http('private/act-roles/' + id, 'DELETE')
          .then(data=> {
            this.actRoles.splice(this.actRoles.findIndex(a=>a.id==id), 1)
          })
      }
    },
    created() {
      this.$http('private/act-roles')
        .then(data=> this.actRoles = data)
        .catch(error=> alert(error))
    }
  }
</script>
