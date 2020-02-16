<template lang="pug">
div
  label
    small Enter a full URL we can link to (including HTTPS) and not just a username.
  select(v-model="socialMedium.typeId")
    option(v-for="socialMediaType in socialMediaTypes" :value="socialMediaType.id") {{socialMediaType.name}}
  | 
  input(type="text" v-model="socialMedium.url")
  | 
  button.danger(style="margin-top:0" @click="$emit('remove-social', index)") Remove
</template>

<script>
export default {
  props: ['socialMediaTypes', 'socialMedium', 'index']
}
</script>
