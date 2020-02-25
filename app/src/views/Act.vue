<template lang="pug">
div
  h2
    router-link(to="/acts") Acts
    |  - {{ act.name }}
  p From {{act | location}}
  h3 Cast & Crew
  ul
    li(v-for="person in act.people")
      router-link(:to="'/person/' + person.id") {{person.name}}
      |  - {{person.role}}
  div(v-if="act.socialMedia.length > 0")
    h3 Social Media
    ul
      li(v-for="social in act.socialMedia")
        strong {{social.name}}: 
        | {{social.url}}

</template>

<script>
  import ActLocation from '@/mixins/act-location'

  export default {
    mixins: [ActLocation],
    data() {
      return {
        act: { socialMedia: []}
      }
    },
      created() {
        this.$http('private/acts/' + this.$route.params.slug)
          .then(data=> this.act = data)
          .catch(error=> alert(error))
    }
  }
</script>
