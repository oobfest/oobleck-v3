<template lang="pug">
  div

    //- READ
    div(v-if="view=='read'")
      h2 People
      p Who is involved in the festival?
      .table-box
        table
          thead
            tr
              th Name
              th Bio
              th Email
              th Phone
              th Visible
          tbody
            tr(v-for="person in people")
              td: router-link(:to="'/person/' + person.id") {{person.name}}
              td {{person.bio}}
              td {{person.email}}
              td {{person.phone}}
              td
                a(href="#" @click.prevent="toggleHidePerson(person)" style="text-decoration:none") 
                  | {{person.isHidden ? '❌' : '✔️'}}
              //- td {{person.isConfirmed}}
      //- button.primary(@click="view='create'") Add Person

    //- CREATE
    div(v-if="view=='create'")
      h2 Add Person
      form
        label Name
        input(type='text' v-model="newPerson.name")
        label Bio
        textarea(v-model="newPerson.bio")
        label Email
        input(type='email' v-model="newPerson.email")
        label Phone
        input(type='tel' v-model="newPerson.phone")
        label Image URL
        input(type='text' v-model="newPerson.imageUrl")
        label Delete Image URL
        input(type='text' v-model="newPerson.deleteImageUrl")
        label 
          input(type='checkbox' v-model="newPerson.isHidden")
          | Hidden
        div
          button.btn.btn-primary(@click="addPerson") Add
          | &nbsp;
          button.btn.btn-secondary(@click="view='read'") Cancel

</template>

<script>
  import Vue from 'vue'

  export default {
    data: function() {
      return {
        view: "read",
        newPerson: { name: "", bio: "", email: "", phone: "", imageUrl: "", imageDeleteUrl: "", isHidden: false },
        people: []
      }
    },
    methods: {
      addPerson() {
        if(this.newPerson.name != '') {
          this.$http('private/people', 'POST', { ...this.newPerson, isHidden: this.newPerson.isHidden ? 1 : 0, isConfirmed: 1 })
            .then(data=> {
              this.people.push(data)
              this.newPerson.name = ""
              this.newPerson.bio = ""
              this.newPerson.email = ""
              this.newPerson.phone = ""
              this.newPerson.imageUrl = ""
              this.newPerson.imageDeleteUrl = ""
              this.view='read'
            })
        }
        else alert("Name required")
      },
      deletePerson(id) {
        this.$http('private/people/' + id, 'DELETE')
          .then(data=> {
            this.people.splice(this.people.findIndex(s=>s.id==id), 1)
          })
      },
      toggleHidePerson(person) {
        this.$http('private/people/' + person.id, 'PUT', {isHidden: person.isHidden ? 0 : 1})
          .then(data=> {
            let personIndex = this.people.findIndex(p=>p.id==data.id)
            Vue.set(this.people, personIndex, data)
          })
          .catch(error=> console.log(error))
      }
    },
    created() {
      this.$http('private/people')
        .then(data=> this.people = data)
        .catch(error=> alert(error))
    }
  }
</script>
