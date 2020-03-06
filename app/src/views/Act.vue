<template lang="pug">
div
  //- Image
  img(:src="act.imageUrl | imgur('small')" style="float:right")

  //- Name
  h2
    router-link(to="/acts") Acts
    |  - {{ act.name }}
  p From {{act | location}}

  //- Contact Info
  h3 Contact Information
  ul
    li {{act.contactName}}
    li: code {{act.contactEmail}}
    li: code {{act.contactPhone}}
  

  //- Cast & Crew
  div(v-if="act.people.length > 0")
    h3 Cast & Crew
    ul
      li(v-for="person in act.people")
        router-link(:to="'/person/' + person.id") {{person.name}}
        |  - {{person.role}}

  //- Social Media
  div(v-if="act.socialMedia.length > 0")
    h3 Social Media
    ul
      li(v-for="social in act.socialMedia")
        strong {{social.name}}: 
        | {{social.url}}
  
  //- Show needs
  h3 Show Needs
  h4 What is the shortest set you would be willing to do?
  p {{act.minimumTime}} minutes
  h4 What is the longest you would be able to perform for?
  p {{act.maximumTime}} minutes
  div(v-if="act.techNeeds")
    h4 What special needs will your act require?
    p {{act.techNeeds}}

  //- Availability
  h3 Availability
  ul
    li(v-for="day in availability") {{day}}

  //- Video Links
  h3 Video Links
  ul
    li(v-if="act.videoUrl1"): a(:href="act.videoUrl1") {{act.videoUrl1}}
    li(v-if="act.videoUrl2"): a(:href="act.videoUrl2") {{act.videoUrl2}}
  div(v-if="act.videoInformation")
    h4 Additional video information or password
    p {{act.videoInformation}}


</template>

<script>
  import ActLocation from '@/mixins/act-location'
  import Imgur from '@/mixins/imgur'

  export default {
    mixins: [ActLocation, Imgur],
    data() {
      return {
        act: { socialMedia: [], availability: [], people: []}
      }
    },
    computed: {
      availability() {
        return this.act.availability
          .sort((a, b)=> a.timestamp-b.timestamp)
          .map(day=> day.name)
      }
    },
    created() {
      this.$http('private/acts/' + this.$route.params.slug)
        .then(data=> this.act = data)
        .catch(error=> alert(error))
    }
  }
</script>
