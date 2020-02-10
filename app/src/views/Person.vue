<template lang="pug">
div
  h2
    router-link(to="/people") People
    |  - {{ person.name }}
  pre {{ person.email }}
  div(v-if="person.bio")
    h3 Bio
    p {{person.bio}}
  div(v-if="")
  div(v-if="person.acts.length > 0")
    h3 Acts
    ul
      li(v-for="act in person.acts"): router-link(:to="'/act/' + act.slug") {{act.name}}
  div(v-if="person.workshops.length > 0")
    h3 Workshops
    ul
      li(v-for="workshop in person.workshops"): router-link(:to="'/workshop/' + workshop.slug") {{workshop.name}}

</template>

<script>
  export default {
    data() {
      return {
        person: { acts: [], workshops: []}
      }
    },
      created() {
        this.$http('private/people/' + this.$route.params.id)
          .then(data=> this.person = data)
          .catch(error=> console.log(error))
    }
  }
</script>
