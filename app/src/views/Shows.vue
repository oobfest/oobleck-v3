<template lang="pug">
  div

    //- READ
    div(v-if="view=='read'")
      h2 Shows
      p 
      .table-box
        table
          thead
            tr
              th Name
              th Stage
              th Day
              th Time
              th Duration
              th
          tbody
            tr(v-for="show in shows")
              td {{show.name}}
              td {{show.stage}}
              td {{show.day}}
              td {{new Date(show.timestamp).toLocaleTimeString()}}
              td {{show.duration}}
              td
                button.danger(@click="deleteShow(show.id)") Delete
      button.primary(@click="view='create'") Add Show

    //- CREATE
    div(v-if="view=='create'")
      h2 Add Show
      p {{timestamp}}
      form
        label Name (optional)
        input(type='text' v-model="newShow.name")
        label Duration (in minutes)
        input(type='number' v-model="newShow.duration")

        label Day
        select(name="day" v-model="newShow.day")
          option(v-for="day in days" :value="day") {{day.name}}
        label Hour
        select(name="hour" v-model="newShow.hour")
          option(v-for="hour in 11" :value="hour") {{hour}}
        label Minute
        select(name="minute" v-model="newShow.minute")
          option(v-for="minute in minutes" :value="parseInt(minute)") {{minute}}

        label Stage
        select(name="stage" v-model="newShow.stageId")
          option(v-for="stage in stages" :value="stage.id") {{stage.name}}

        div
          button.primary(@click.prevent="addShow") Add
          | &nbsp;
          button.secondary(@click="view='read'") Cancel

</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newShow: { name: null, day: {timestamp:0}, duration: 90, hour:5, minute:0, stageId:null },
        minutes: ['00', '15', '30', '45'],
        shows: [],
        days: [],
        stages: []
      }
    },
    computed: {
      timestamp() {
        return new Date(this.newShow.day.timestamp + 43200000
          + this.newShow.hour * 3600000 
          + this.newShow.minute * 60000
        )
      }
    },
    methods: {
      addShow() {
        if(this.newShow.name != '') {
          let newShow = {
            timestamp: this.timestamp,
            duration: this.newShow.duration,
            name: this.newShow.name,
            imageUrl: null,
            imageDeleteUrl: null,
            dayId: this.newShow.day.id,
            stageId: this.newShow.stageId
          }
          this.$http('private/shows', 'POST', newShow)
            .then(data=> {
              this.shows.push(data)
              this.newShow.name = ""
              this.newShow.duration = 90
              this.view='read'
            })
        }
        else alert("Name required")
      },
      deleteShow(id) {
        this.$http('private/shows/' + id, 'DELETE')
          .then(data=> {
            this.shows.splice(this.shows.findIndex(s=>s.id==id), 1)
          })
      }
    },
    created() {
      this.$http('private/shows')
        .then(data=> this.shows = data)
        .catch(error=> alert(error))

      this.$http('private/stages')
        .then(data=> this.stages = data)
        .catch(error=> alert(error))

      this.$http('private/days')
        .then(data=> this.days = data)
        .catch(error=> alert(error))
    }
  }
</script>
