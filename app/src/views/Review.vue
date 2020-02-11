<template lang="pug">
div
  h2 Review Acts
  ul
    li(v-for="act in acts") {{act.name}}

</template>

<script>
  export default {
    data: function() {
      return {
        acts: []
      }
    },
    created() {
      // Todo: filter based on role
      this.$http('private/acts')
        .then(data=> this.acts = data)
        .catch(error=> alert(error))
    }
  }
</script>
