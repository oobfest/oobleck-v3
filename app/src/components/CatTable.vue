<template lang="pug">
  div

    div(v-if="view=='read'")
      h2 Cats
      table.table.table-striped.table-bordered
        thead
          tr
            th Name
            th Fluffy?
            th
        tbody
          tr(v-for="cat in cats")
            td {{cat.name}}
            td {{cat.isFluffy ? 'Fluffy!' : 'No' }}
            td
              button.btn.btn-danger(@click="deleteCat(cat.id)") Delete
      button.btn.btn-primary(@click="view='create'") Add Cat

    div(v-if="view=='create'")
      h2 Add Cat
      form
        .form-group
          label(for="new-cat") Cat Name
          input#new-cat.form-control(type='text' v-model="newCat.name")
        .form-group
          .checkbox
            label
              input(type="checkbox" v-model="newCat.isFluffy" true-value="1" false-value="0")
              | Fluffy?
        button.btn.btn-primary(@click="addCat") Add
        | &nbsp;
        button.btn.btn-secondary(@click="view='read'") Cancel
</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newCat: { name: "", isFluffy: 0 },
        cats: [],
        users: []
      }
    },
    methods: {
      addCat() {
        if(this.newCat.name != '') {
          this.$http('cats', 'POST', this.newCat)
            .then(data=> {
              this.cats.push(data)
              this.newCat.name = ""
              this.newCat.isFluffy = 0
              this.view='read'
            })
        }
        else alert("Cat name required")
      },
      deleteCat(id) {
        this.$http('cats/' + id, 'DELETE')
          .then(data=> {
            console.log(data)
            this.cats.splice(this.cats.findIndex(c=>c.id==id), 1)
          })
      }
    },
    created() {
      this.$http('cats')
        .then(data=> this.cats = data)
        .catch(error=> alert(error))
    }
  }
</script>
