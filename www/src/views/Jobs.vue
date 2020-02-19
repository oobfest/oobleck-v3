<template lang="pug">
  div
    .image-box.staff
      h2 Work for Out of Bounds!
    p Get in on all that sweet, sweet non-profit comedy festival money.

    h4 Open Positions
    p: nav
      router-link(to="/jobs/volunteer-coordinator") Volunteer Coordinator
      span  | 
      router-link(to="/jobs/special-tech-coordinator") Special Tech Coordinator
      span  | 
      router-link(to="/jobs/marketing-director") Marketing Director
    router-view

</template>

<script>

</script>
