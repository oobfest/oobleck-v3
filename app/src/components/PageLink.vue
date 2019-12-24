<template lang="pug">
router-link(
  v-if="isAuthorized"
  :to="to" 
  :roles="roles" 
  v-slot="{ href, route, navigate, isExactActive }")
  li(:class="{active: isExactActive}")
    a(:href="href" @click="navigate") {{route.name}}
</template>

<script>
export default {
  props: ['to', 'roles'],
  computed: {
    isAuthorized() {
      return this.roles.includes(this.$store.state.role)
    }
  }
}
</script>
