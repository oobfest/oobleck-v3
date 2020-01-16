<template lang="pug">
  div

    //- READ
    div(v-if="view=='read'")
      h2 Cats
      .table-box
        table
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
                button.danger(@click="deleteCat(cat.id)") Delete
      button.primary(@click="view='create'") Add Cat

    //- CREATE
    div(v-if="view=='create'")
      h2 Add Cat
      form
        label(for="new-cat") Cat Name
        input(type='text' v-model="newCat.name")
        label.checkbox
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
        cats: []
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
