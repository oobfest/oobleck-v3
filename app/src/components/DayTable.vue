<template lang="pug">
  div

    div(v-if="view=='read'")
      h2 Days
      .table-box
        table
          thead
            tr
              th Name
              th Date
              th
          tbody
            tr(v-for="day in days")
              td {{day.name}}
              td {{ day.timestamp | prettyDate }}
              td
                button.btn.btn-danger(@click="deleteDay(day.id)") Delete
      button.primary(@click="view='create'") Add Day

    div(v-if="view=='create'")
      h2 Add Day
      form
        .form-group
          label(for="new-day-name") Day Name
          input#new-day-name.form-control(type='text' v-model="newDay.name")
        .form-group
          label(for="new-day-year") Year
          input#new-day-year.form-control(type='number' v-model="newDay.year")
        .form-group
          label(for="new-day-month") Month
          select#new-day-month.form-control(v-model.number="newDay.month")
            option(v-for="month, index in months" :value="index") {{month}}
        .form-group
          label(for="new-day-day") Day
          select#new-day-day.form-control(v-model.number="newDay.day")
            option(v-for="n in daysInMonth") {{n}}
        button.btn.btn-primary(@click="addDay") Add
        | &nbsp;
        button.btn.btn-secondary(@click="view='read'") Cancel
</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        newDay: { 
          name: "", 
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate()
        },
        days: []
      }
    },
    computed: {
      daysInMonth() {
        return new Date(this.newDay.year, this.newDay.month+1, 0).getDate()
      }
    },
    filters: {
      prettyDate(timestamp) {
        return new Date(timestamp).toDateString()
      }
    },
    methods: {
      addDay() {
        let newDay = { 
          name: this.newDay.name,
          timestamp: new Date(this.newDay.year, this.newDay.month, this.newDay.day).getTime()
        }
        if(this.newDay.name != '') {
          this.$http('days', 'POST', newDay)
            .then(data=> {
              this.days.push(data)
              this.newDay.name = ""
              this.newDay.year = new Date().getFullYear()
              this.newDay.month = new Date().getMonth()
              this.newDay.day = new Date().getDate()
              this.view='read'
            })
        }
        else alert("Day name required")
      },
      deleteDay(id) {
        this.$http('days/' + id, 'DELETE')
          .then(data=> {
            this.days.splice(this.days.findIndex(d=>d.id==id), 1)
          })
      }
    },
    created() {
      this.$http('days')
        .then(data=> this.days = data)
        .catch(error=> alert(error))
    }
  }
</script>
