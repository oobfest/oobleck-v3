<template lang="pug">
div
  div(v-if="!selectedAct")
    h2 Review Acts
    .table-box
      table
        thead
          tr
            th Name
            th From
            th Type
        tbody
          tr(v-for="act in actsForUser") 
            td: a(href="#" @click.prevent="getAct(act.slug)") {{act.name}}
            td {{act | location}}
            td {{ act.actTypes.join(', ') }}
            td.score {{ getReview(act.id) | score }}

  div(v-else)
    h2
      a(href="#" @click.prevent="selectedAct=null") Review Acts
      |  / {{selectedAct.name}}
    p From 
      em {{ selectedAct | location }}
    img(:src="selectedAct.imageUrl | imgur('large')" style="display:block; margin: 0 auto; width:auto")

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
  import Score from '@/mixins/score'
  import Imgur from '@/mixins/imgur'

  export default {
    mixins: [ActLocation, Score, Imgur],
    data: function() {
      return {
        reviews: [],
        selectedAct: null,
        score: null,
        notes: null
      }
    },
    computed: {
      userRole() {
        return this.$store.state.role
      },
      actsForUser() {
        let role = this.$store.state.role
        if(role == 'standup-panelist') return this.standupActs
        else if (role == 'panelist') return this.nonStandupActs
        else if (role == 'staff' || role == 'admin') return this.allActs
      },
      nonStandupActs() {
        return this.$store.state.acts .filter(a=>!a.actType.includes('Standup'))
      },
      standupActs() {
        return this.$store.state.acts.filter(a=>a.actType.includes('Standup'))
      },
      allActs() {
        return this.$store.state.acts
      }
    },
    methods: {
      getAct(slug) {
        this.$http(`private/acts/review/${slug}/${this.$store.state.userId}`)
          .then(data=> {
            this.selectedAct = data
            this.score = data.score
            this.notes = data.notes
          })
          .catch(error=> alert(error))
      },
      getReview(actId) {
        let review = this.reviews.find(r=> r.actId == actId)
        return review ? review.score : ''
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
            this.$http('private/reviews/?userId=' + this.$store.state.userId, 'GET')
              .then(data=> this.reviews = data)
          })
          .catch(error=> alert(error))
      }
    },
    created() {
      this.$store.dispatch('loadActs')
      this.$http('private/reviews/?userId=' + this.$store.state.userId, 'GET')
        .then(data=> this.reviews = data)
    }
  }
</script>
