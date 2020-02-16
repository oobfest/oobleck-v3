<template lang="pug">
div
  label.required Name
  input(type="text" v-model="person.name")
  label.required Email
  input(type="email" v-model="person.email")
  label.required Role
  select(v-model="person.roleId")
    option(v-for="actRole in actRoles" :value="actRole.id") {{actRole.name}}
  div
    button.danger(@click="$emit('remove-person', index)") Remove
</template>

<script>
export default {
  props: ['person', 'actRoles', 'index']
}
</script>
