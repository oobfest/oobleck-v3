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
          th Type
      tbody
        tr(v-for="act in acts")
          td: router-link(:to="'/act/' + act.slug")
            span(v-if="act.showTitle") {{act.name}}: {{act.showTitle}}
            span(v-else) {{act.name}}
          td {{act | location}}
          td: ul
            li(v-for="actType in act.actTypes") {{actType}}

</template>

<script>
  import ActLocation from '@/mixins/act-location'

  export default {
    mixins: [ActLocation],
    data() {
      return {
        view: "read",
        newAct: { name: "" },
        acts: []
      }
    },
    created() {
      this.$http('private/acts')
        .then(data=> this.acts = data)
        .catch(error=> alert(error))
    }
  }
</script>
