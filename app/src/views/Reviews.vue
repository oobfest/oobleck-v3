<template lang="pug">
div
  h2 Reviews
  p Submissions with 5+ reviews: {{submissionsDoneWithReviewsCount}} out of {{acts.length}}
  .table-box
    table
      thead
        tr
          th
          th Act
          th Scores
      tbody
        tr(v-for="act in acts")
          td: span(v-if="act.reviews.length>=5") ✅
          td {{act.name}}
          td
            li(v-for="review in act.reviews")
              strong {{review.reviewer}} 
              span {{review.score | score }} {{review.notes}}

</template>

<script>
  import Score from '@/mixins/score'

  export default {
    mixins: [Score],
    data: function() {
      return {
        acts: [],
      }
    },
    computed: {
      submissionsDoneWithReviewsCount() {
        return this.acts
          .filter(a=> a.reviews.length >= 5)
          .length
      }
    },
    created() {
      this.$http('private/reviews')
        .then(data=> this.acts = data.sort((a,b)=> a.name.localeCompare(b.name)))
        .catch(error=> alert(error))
    }
  }
</script>
