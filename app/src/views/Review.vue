<template lang="pug">
div
  div(v-if="!selectedAct")
    h2 Review Acts
    ul
      li(v-for="act in acts"): a(href="#" @click.prevent="getAct(act.slug)") {{act.name}}
  div(v-else)
    h2
      a(href="#" @click.prevent="selectedAct=null") Review Acts
      |  / {{selectedAct.name}}
    p From 
      em {{ selectedAct | location }}

    h3 Cast & Crew
    p: ul
      li(v-for="person in selectedAct.people") {{person.name}} - {{person.role}}
    h3 Describe Your Act to Us
    p {{selectedAct.privateDescription}}
    h3 Describe Your Act to the Public
    p {{selectedAct.publicDescription}}
    h3 Video Links
    p: ul
      li: a(:href="selectedAct.videoUrl1" target="_blank") {{selectedAct.videoUrl1}}
      li(v-if="selectedAct.videoUrl2"): a(:href="selectedAct.videoUrl2" target="_blank") {{selectedAct.videoUrl2}}
    
    h3 Your Score
    .score-box
      label
        input(type="radio" value=5 v-model="score")
        |  5 🤩 Amazing!
      label
        input(type="radio" value=4 v-model="score")
        |  4 🙂 Yeah
      label
        input(type="radio" value=3 v-model="score")
        |  3 😑 Meh
      label
        input(type="radio" value=2 v-model="score")
        |  2 😟 Nah
      label
        input(type="radio" value=1 v-model="score")
        |  1 😡 Veto
    h3 Notes
    textarea(v-model="notes")

    p: button(@click="submit") Submit Review

</template>

<script>
  import ActLocation from '@/mixins/act-location'

  export default {
    mixins: [ActLocation],
    data: function() {
      return {
        acts: [],
        selectedAct: null,
        score: null,
        notes: null
      }
    },
    computed: {
      isStandupPanelist() {
        return this.$store.state.role == 'standup-panelist'
      }
    },
    methods: {
      getAct(slug) {
        this.$http('private/acts/review/' + slug)
          .then(data=> this.selectedAct = data)
          .catch(error=> alert(error))
      },
      submit() {
        let review = {
          actId: this.selectedAct.id,
          userId: this.$store.state.userId,
          score: this.score,
          notes: this.notes
        }
        this.$http('private/reviews', 'POST', review)
          .then(response=> {
            this.selectedAct = null
            this.score = null
            this.notes = null
          })
          .catch(error=> alert(error))
      }
    },
    created() {
        this.$http(
          this.isStandupPanelist
            ? 'private/acts/review-standup'
            : 'private/acts/review')
          .then(data=> this.acts = data)
          .catch(error=> alert(error))
    }
  }
</script>
