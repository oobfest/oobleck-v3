<template lang="pug">
#app
  nav
    ul
      li: router-link(to="/") Home
      //li: router-link(to="/about") About
      li: router-link(to="/apply") Apply
      li: router-link(to="/jobs") Jobs

  header
    img.logo(src="/images/logo.png" alt="Out of Bounds Comedy Festival")
    h2 Labor Day Weekend
    h3 September 1
      sup st 
      |  to September 7
      sup th
  main
    router-view

</template>
