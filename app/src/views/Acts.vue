<template lang="pug">
div
  h2 Acts
  p Performers perform acts as a part of a show. An act can be in multiple shows.
  .table-box
    table
      thead
        tr
          th Name
          th From
      tbody
        tr(v-for="act in acts")
          td: router-link(:to="'/act/' + act.slug")
            span(v-if="act.showTitle") {{act.name}}: {{act.showTitle}}
            span(v-else) {{act.name}}
          td {{from(act)}}

</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newAct: { name: "" },
        acts: []
      }
    },
    methods: {
      from(act) {
        return `${act.associatedTheater} in ${act.city}, ${act.stateOrProvince}, ${act.country}`
      }
    },
    created() {
      this.$http('private/acts')
        .then(data=> this.acts = data)
        .catch(error=> alert(error))
    }
  }
</script>
