<template lang="pug">
  div

    div(v-if="view=='read'")
      h2 Stages
      p What stages are shows being performed at? Each stage is associated with (but different from) a 
        a(href="/#/venues") venue
        | .
      p The Hideout Theatre is a 
        em venue
        |  but Hideout Upstairs and Hideout Downstairs are 
        em stages
        | .
      .table-box
        table
          thead
            tr
              th Name
              th Venue
              th
          tbody
            tr(v-for="stage in stages")
              td {{stage.name}}
              td {{stage.venue}}
              td
                button.btn.btn-danger(@click="deleteStage(stage.id)") Delete
      button.btn.btn-primary(@click="view='create'") Add Stage

    div(v-if="view=='create'")
      h2 Add Stage
      form
        .form-group
          label(for="new-stage") Stage Name
          input#new-stage.form-control(type='text' v-model="newStage.name")
        .form-group
          label(for="new-stage-venue") Stage Venue
          select#new-stage-venue.form-control(v-model="newStage.venueId")
            option(v-for="venue in venues" :value="venue.id") {{ venue.name }}
        button.btn.btn-primary(@click="addStage") Add
        | &nbsp;
        button.btn.btn-secondary(@click="view='read'") Cancel
</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newStage: { name: "", venueId: null },
        stages: [],
        venues: []
      }
    },
    methods: {
      addStage() {
        if(this.newStage.name != '') {
          this.$http('private/stages', 'POST', this.newStage)
            .then(data=> {
              data.venue = this.venues.find(v=> v.id == data.venueId).name
              this.stages.push(data)
              this.newStage.name = ""
              this.newStage.venueId = null
              this.view='read'
            })
        }
        else alert("Stage name required")
      },
      deleteStage(id) {
        this.$http('private/stages/' + id, 'DELETE')
          .then(data=> {
            this.stages.splice(this.stages.findIndex(c=>c.id==id), 1)
          })
      }
    },
    created() {
      this.$http('private/venues')
        .then(data=> this.venues = data)
        .catch(error=> alert(error))

      this.$http('private/stages')
        .then(data=> this.stages = data)
        .catch(error=> alert(error))
    }
  }
</script>
