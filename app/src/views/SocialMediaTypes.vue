<template lang="pug">
  div

    //- READ
    div(v-if="view=='read'")
      h2 Social Media Types
      p What are the social media types that an act or performer can have?
      .table-box
        table
          thead
            tr
              th Name
              th
          tbody
            tr(v-for="socialMediaType in socialMediaTypes")
              td {{socialMediaType.name}}
              td
                button.danger(@click="deleteSocialMediaType(socialMediaType.id)") Delete
      button.primary(@click="view='create'") Add Social Media Type

    //- CREATE
    div(v-if="view=='create'")
      h2 Add Social Media Type
      form
        label Name
        input(type='text' v-model="newSocialMediaType.name")
        div
          button.btn.btn-primary(@click="addSocialMediaType") Add
          | &nbsp;
          button.btn.btn-secondary(@click="view='read'") Cancel

</template>

<script>
  export default {
    data: function() {
      return {
        view: "read",
        newSocialMediaType: { name: "" },
        socialMediaTypes: []
      }
    },
    methods: {
      addSocialMediaType() {
        if(this.newSocialMediaType.name != '') {
          this.$http('social-media-types', 'POST', this.newSocialMediaType)
            .then(data=> {
              this.socialMediaTypes.push(data)
              this.newSocialMediaType.name = ""
              this.view='read'
            })
        }
        else alert("Name required")
      },
      deleteSocialMediaType(id) {
        this.$http('social-media-types/' + id, 'DELETE')
          .then(data=> {
            this.socialMediaTypes.splice(this.socialMediaTypes.findIndex(s=>s.id==id), 1)
          })
      }
    },
    created() {
      this.$http('social-media-types')
        .then(data=> this.socialMediaTypes = data)
        .catch(error=> alert(error))
    }
  }
</script>
