<template lang="pug">
div
  h2
    router-link(to="/acts") Acts
    |  - {{ act.name }}
  p From {{act.city}}, {{act.stateOrProvince}}
  h3 Cast & Crew
  ul
    li(v-for="person in act.people")
      router-link(:to="'/person/' + person.id") {{person.name}}
      |  - {{person.role}}

</template>

<script>
  export default {
    data() {
      return {
        act: {}
      }
    },
      created() {
        this.$http('private/acts/' + this.$route.params.slug)
          .then(data=> this.act = data)
          .catch(error=> alert(error))
    }
  }
</script>
