<template lang="pug">
div
  h2 Reviews
  .table-box
    table
      thead
        tr
          th Act
          th Scores
      tbody
        tr(v-for="actName in actNames") 
          td {{ actName }}
          td(style="font-size:1.5rem")
            span(v-for="score in groupedScores[actName]") {{ score | score }} 


</template>

<script>
  import Score from '@/mixins/score'

  export default {
    mixins: [Score],
    data: function() {
      return {
        reviews: [],
      }
    },
    computed: {
      actNames() {
        return Object.keys(this.groupedScores).sort()
      },
      groupedScores() {
        return this.reviews.reduce((accumulation, review)=> {
          accumulation[review.actName]
            ? accumulation[review.actName].push(review.score)
            : accumulation[review.actName] = [review.score]
          return accumulation
        }, {})
      }
    },
    created() {
      this.$http('private/reviews')
        .then(data=> this.reviews = data)
        .catch(error=> alert(error))
    }
  }
</script>
