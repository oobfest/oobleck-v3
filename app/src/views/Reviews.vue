<template lang="pug">
div
  h2 Reviews
  p Submissions with 5+ reviews: {{submissionsDoneWithReviewsCount}} out of {{acts.length}}

  div(v-for="user in users")
    h3 {{user.userName}} 
      small {{user.role}} 
    p {{user.reviews.length}} review
      span(v-if="user.reviews.length!=1") s

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
        users: [],
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

      this.$http('private/reviews/get-user-reviews')
        .then(data=> this.users = data.sort((a,b)=> a.userName.localeCompare(b.userName)))
        .catch(error=> alert(error))
    }
  }
</script>
