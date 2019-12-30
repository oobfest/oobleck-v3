<template lang="pug">
  div

    div(v-if="view=='read'")
      h2 Venues
      .table-box
        table
          thead
            tr
              th Name
              th
          tbody
            tr(v-for="venue in venues")
              td {{venue.name}}
              td
                button.btn.btn-danger(@click="deleteVenue(venue.id)") Delete
      button.btn.btn-primary(@click="view='create'") Add Venue

    div(v-if="view=='create'")
      h2 Add Venue
      form
        .form-group
          label(for="new-venue") Venue Name
          input#new-venue.form-control(type='text' v-model="newVenue.name")
        button.btn.btn-primary(@click="addVenue") Add
        | &nbsp;
        button.btn.btn-secondary(@click="view='read'") Cancel
</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newVenue: { name: "" },
        venues: []
      }
    },
    methods: {
      addVenue() {
        if(this.newVenue.name != '') {
          this.$http('venues', 'POST', this.newVenue)
            .then(data=> {
              this.venues.push(data)
              this.newVenue.name = ""
              this.view='read'
            })
        }
        else alert("Venue name required")
      },
      deleteVenue(id) {
        this.$http('venues/' + id, 'DELETE')
          .then(data=> {
            this.venues.splice(this.venues.findIndex(c=>c.id==id), 1)
          })
          .catch(error=> alert("Error deleting venue"))
      }
    },
    created() {
      this.$http('venues')
        .then(data=> this.venues = data)
        .catch(error=> alert(error))
    }
  }
</script>
