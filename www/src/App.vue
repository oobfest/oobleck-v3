<template lang="pug">
#app
  nav
    ul
      li: router-link(to="/") Home
      li: router-link(to="/about") About
      li: router-link(to="/apply") Apply

  main
    img.logo(src="/images/logo.png" alt="Out of Bounds Comedy Festival")
    router-view

</template>
