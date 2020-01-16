<template lang="pug">
  div
    //- READ
    div(v-if="view=='read'")
      h2 Act Types
      p What are the different kinds of acts?
      p Every act has at least one act type associated with it but can be multiple, e.g. 'Musical' and 'Improv'
      .table-box
        table
          thead
            tr
              th Name
              th
          tbody
            tr(v-for="actType in actTypes")
              td {{actType.name}}
              td
                button.danger(@click="deleteActType(actType.id)") Delete
      button.primary(@click="view='create'") Add Act Type

    //- CREATE
    div(v-if="view=='create'")
      h2 Add ActType
      form
        label(for="new-act-type") Act Type Name
        input(type='text' v-model="newActType.name")
        div
          button.btn.btn-primary(@click="addActType") Add
          | &nbsp;
          button.btn.btn-secondary(@click="view='read'") Cancel

</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newActType: { name: "" },
        actTypes: []
      }
    },
    methods: {
      addActType() {
        if(this.newActType.name != '') {
          this.$http('act-types', 'POST', this.newActType)
            .then(data=> {
              this.actTypes.push(data)
              this.newActType.name = ""
              this.view='read'
            })
        }
        else alert("Name required")
      },
      deleteActType(id) {
        this.$http('act-types/' + id, 'DELETE')
          .then(data=> {
            this.actTypes.splice(this.actTypes.findIndex(a=>a.id==id), 1)
          })
      }
    },
    created() {
      this.$http('act-types')
        .then(data=> this.actTypes = data)
        .catch(error=> alert(error))
    }
  }
</script>
