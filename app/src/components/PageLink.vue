<template lang="pug">
router-link(:to="to" v-slot="{ href, route, navigate, isExactActive }")
  li(:class="{active: isExactActive}")
    a(:href="href" @click="navigate") {{route.fullPath}}
</template>

<script>
export default {
  props: ['to']
}
</script>
