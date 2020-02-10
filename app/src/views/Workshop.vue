<template lang="pug">
div
  h2
    router-link(to="/workshops") Workshops
    |  - {{ workshop.name }}
  p {{workshop.description}}
  h3 Instructors
  ul
    li(v-for="person in workshop.instructors"): router-link(:to="'/person/' + person.id") {{person.name}}

</template>

<script>
  export default {
    data() {
      return {
        workshop: {}
      }
    },
      created() {
        this.$http('private/workshops/' + this.$route.params.slug)
          .then(data=> this.workshop = data)
          .catch(error=> alert(error))
    }
  }
</script>
