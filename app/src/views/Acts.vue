<template lang="pug">
div
  h2 Acts
  p Total submissions: {{acts.length}}
  .table-box
    table
      thead
        tr
          th Name
          th From
          th Type
        tr
          th
            input(type="text" v-model="nameSearch" placeholder="Search")
          th
            select(v-model="from")
              option Anywhere
              option Austin
              option Out-of-Town
          th 
            select(v-model="type")
              option Everybody
              option Not Standup
              option Only Sketch
              option Only Standup
      tbody
        tr(v-for="act in filteredActs")
          td: router-link(:to="'/act/' + act.slug")
            span(v-if="act.showTitle") {{act.name}}: {{act.showTitle}}
            span(v-else) {{act.name}}
          td {{act | location}}
          td: ul
            li(v-for="actType in act.actTypes") {{actType}}

</template>

<script>
  import ActLocation from '@/mixins/act-location'

  export default {
    mixins: [ActLocation],
    data() {
      return {
        from: 'Anywhere',
        type: 'Everybody',
        nameSearch: '',
        acts: []
      }
    },
    computed: {
      filteredActs() {
        let filteredActs = this.acts

        // Filter by name search
        if(this.nameSearch) {
          filteredActs = filteredActs
            .filter(a=> a.name
              .match(new RegExp(this.nameSearch, 'i')))
        }

        // Filter by City
        if(this.from=='Austin') filteredActs = filteredActs.filter(a=> a.city == 'Austin')
        else if(this.from=='Out-of-Town') filteredActs = filteredActs.filter(a=>a.city != 'Austin')

        // Filter by Type
        if(this.type=='Not Standup') filteredActs =filteredActs.filter(a=> !a.actTypes.includes('Standup'))
        else if(this.type=='Only Sketch') filteredActs = filteredActs.filter(a=> a.actTypes.includes('Sketch'))
        else if(this.type=='Only Standup') filteredActs = filteredActs.filter(a=> a.actTypes.includes('Standup'))

        filteredActs.sort((a, b)=> { return a.name.localeCompare(b.name)})

        return filteredActs
      }
    },
    created() {
      this.$http('private/acts')
        .then(data=> this.acts = data)
        .catch(error=> alert(error))
    }
  }
</script>
