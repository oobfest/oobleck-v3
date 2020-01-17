<template lang="pug">
  div

    //- READ
    div(v-if="view=='read'")
      h2 Workshops
      p Not to be confused with 
        em workshop sessions
        | , which are specific occurances of a workshop.
      .table-box
        table
          thead
            tr
              th Name
              th Slug
              th Description
              th Price
              th Audit Price
              th Capacity
              th Audit Capacity
              th
          tbody
            tr(v-for="workshop in workshops")
              td {{workshop.name}}
              td {{workshop.slug}}
              td {{workshop.description}}
              td {{workshop.price}}
              td {{workshop.auditPrice}}
              td {{workshop.capacity}}
              td {{workshop.auditCapacity}}
              td
                button.danger(@click="deleteWorkshop(workshop.id)") Delete
      button.primary(@click="view='create'") Add Workshop

    //- CREATE
    div(v-if="view=='create'")
      h2 Add Workshop
      form
        label Name
        input(type='text' v-model="newWorkshop.name")
        label Description
        textarea(v-model="newWorkshop.description")
        label Price
        input(type='number' v-model="newWorkshop.price" min=0)
        label Audit Price
        input(type='number' v-model="newWorkshop.auditPrice" min=0)
        label Capacity
        input(type='number' v-model="newWorkshop.capacity" min=0)
        label Audit Capacity
        input(type='number' v-model="newWorkshop.auditCapacity" min=0)

        label Instructors
        ul
          li(v-for="(instructor, index) in newWorkshop.instructors") 
            | {{instructor.name}} 
            a(href="#" @click.prevent="newWorkshop.instructors.splice(index, 1)") remove
        select(v-model="newInstructor")
          option(v-for="person in people" :value="person") {{person.name}}
        button(@click="newWorkshop.instructors.push(newInstructor)") Add Instructor

        div
          button.btn.btn-primary(@click="addWorkshop") Add
          | &nbsp;
          button.btn.btn-secondary(@click="view='read'") Cancel

</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newWorkshop: { 
          name: "Improv for Walruses",
          description: "Finally, a workshop for the rest of us.", 
          price: 10, 
          auditPrice: 5, 
          capacity: 20, 
          auditCapacity: 25, 
          instructors: [] 
        },
        workshops: [],
        newInstructor: {},
        people: []
      }
    },
    methods: {
      addWorkshop() {
        this.$http('workshops', 'POST', this.newWorkshop)
          .then(data=> {
            this.workshops.push(data)
            this.newWorkshop.name = ""
            this.view='read'
          })
      },
      deleteWorkshop(id) {
        this.$http('workshops/' + id, 'DELETE')
          .then(data=> {
            this.workshops.splice(this.workshops.findIndex(s=>s.id==id), 1)
          })
      }
    },
    created() {
      this.$http('workshops')
        .then(data=> this.workshops = data)
        .catch(error=> alert(error))

      this.$http('people/public')
        .then(data=> this.people = data)
        .catch(error=> alert(error))
    }
  }
</script>
