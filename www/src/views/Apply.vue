<template lang="pug">
div
  .text-align-center
    h2 2020 Performer Application
  h3 Thank you for applying to Out of Bounds!
  p Our festival doesn't work without performers, so thanks for that.
  h4 Important Dates
  p: ul
    li This year's festival will be from 
      strong September 1st
      |  to 
      strong September 7th
    li Acceptance emails will be sent out on 
      strong [date here]
    li The last day to apply to the festival wil be on 
      strong [date here]

  h4 Act Details
  label Name
  input(type="text" v-model="newAct.name")
  label Show Title
    small Only fill this out if your show title is different from your group or performer name.
  input(type="text" v-model="newAct.showTitle")

  h4 Show Type
  p Select all that apply.
  p
    label.checkbox(v-for="showType in showTypes")
      input(type="checkbox" v-model="newAct.actTypes" :value="showType.id")
      | {{showType.name}}

  h4 Show Description
  label Describe Your Act to Us
    small This is meant to persuade reviwers and won't be visible to the public. What makes your act special?
    textarea(v-model="newAct.privateDescription")
  label Describe Your Act to The Public
    small Accepted acts will have this content published on our website and programs. Use third-person active voice, e.g. "Miller & Lies is..."
    small
      a(href="#" @click.prevent="seeExample=!seeExample") See an example
      p(v-show="seeExample") "Miller & Lies is a comedy duo that performs a single story with awkward, emotionally vulnerable oddball characters. They've been doing improv together for ten years. Come hang with them and feel your feelings."
    textarea(v-model="newAct.publicDescription")
  label Festival Apperances, Awards and Reviews
    small List any previous festival appearances, awards you've won, and any additional press materials (quotes, links to reviews, etc)
    textarea(v-model="newAct.accolades")

  h4 Primary Location

  country-dropdown(v-model="newAct.country")

  div(v-if="newAct.country == 'US'")
    state-dropdown(v-model="newAct.stateOrProvince")
  div(v-else)
    label State or Province (if applicable)
    input(type="text" v-model="newAct.stateOrProvince")

  label City
  input(type="text" v-model="newAct.city")

  label What individual venue, theater or club are you associated with? Leave blank if not applicable.
    small Just a single name is needed. Please do not write a short story about how and why no one place truly represents you.
    input(type="text" v-model="newAct.associatedTheater")

  //- p {{newAct.showTitle}} by {{newAct.name}} from {{newAct.associatedTheater}} in {{newAct.city}}, {{newAct.stateOrProvince}}, {{newAct.country}}

  h4 Image Upload
  p Accepted acts will have their submitted photo used for the festival website, trading cards and programs. 
  p: ul
    li Photos or graphics only. There should be no text in the image!
    li Image should be 
      em at least 
      |  600 × 600 pixels
    li File size under 10MB (use JPEG)
  image-upload

  h4 Cast and Crew
  p Please list everyone that will be attending the festival.
  div(v-for="(person, index) in newAct.people")
    person(
      :person="person"
      :act-roles="actRoles"
      :index="index" 
      @remove-person="newAct.people.splice(index, 1)")
  button(@click.prevent="newAct.people.push({name: '', email:'', roleId:1})") Add Person

  h4 Contact Information
  p In case we need to get ahold of you in regards to your submission, who is the best person to contact?
  label Name
  input(type="text" v-model="newAct.contactName")

  label Email
  input(type="email" v-model="newAct.contactEmail")

  label Phone
  input(type="tel" v-model="newAct.contactPhone")

  label Role
  select(v-model="newAct.contactRoleId")
    option(v-for="actRole in actRoles" :value="actRole.id") {{actRole.name}}

  h4 Performance Requirements
  label What is the shortest set (in minutes) you would be willing to do for the festival?
  input(type="number" v-model="newAct.minimumTime")
  label What is the longest (in minutes) you would be able to perform for?
  input(type="number" v-model="newAct.maximumTime")
  label What special needs will your act require? For example, video projection, sound effects, props that you can't bring yourself and if you need us to provide a musician. Please be specific!
  textarea(v-model="newAct.techNeeds")

  p: label.checkbox
    input(type="checkbox" v-model="noFood")
    | This show will not make a mess on stage with food, liquids or anything else.

  h4 Video URLs
  p If you are standup, submit an unedited 5-15 minute video from a recent performance.
  p Otherwise, please submit a URL to an unedited, full-length video of a performance of the act you intend to bring to Out of Bounds from the past 12 months. It should be at least 20 minutes long.
  p Video sketches and other fully-edited videos are not accepted.
  p Do not submit a video of a show different from what you would be performing at Out of Bounds.
  
  label Video URL(s)
  input(type="text" v-model="newAct.videoUrl1")
  | 
  input(type="text" v-model="newAct.videoUrl2")
  label Does your video require a password or any other additonal information? Leave blank if no.
  input(type="text" v-model="newAct.videoInformation")


  h4 Social Media
  p Accepted acts will have their social media links listed on the festival website.
  div(v-for="(socialMedium, index) in newAct.socialMedia")
    social-media(
      :social-media-types="socialMediaTypes" 
      :social-medium="socialMedium" 
      :index="index" 
      @remove-social="newAct.socialMedia.splice(index, 1)")
  button(@click.prevent="newAct.socialMedia.push({typeId: null, url: ''})") Add Social Media

  h4 Availability
  p Which days of the festival are you able to attend? 
  p Availability beyond Friday & Saturday will 
    em greatly increse
    |  your chances of getting accepted.
  p
    label.checkbox(v-for="day in days")
      input(type="checkbox" v-model="newAct.availability" :value="day.id")
      | {{day.timestamp | formatTime}}

  h4 Travel Agreement
  p If you are from out of town, we will need your travel information at least 30 days before the festival. Will you be able to provide this? Failure to do so can result in your act being pulled.
  select(v-model="newAct.isLocal")
    option(:value="null") ---
    option(:value="false") Yes
    option(:value="true") We're local!
</template>

<script>
import moment from 'moment'
import ImageUpload from '@/components/ImageUpload'
import CountryDropdown from '@/components/CountryDropdown'
import StateDropdown from '@/components/StateDropdown'
import SocialMedia from '@/components/SocialMedia'
import Person from '@/components/Person'

export default {
  components: { ImageUpload, CountryDropdown, StateDropdown, SocialMedia, Person},
  filters: {
    formatTime(timestamp) {
      return moment(timestamp).format('dddd, MMMM Do')
    }
  },
  methods: { moment },
  data() {
    return {
      seeExample: false,
      showTypes: [],
      days: [],
      noFood: true,
      socialMediaTypes: [],
      actRoles: [],
      newAct: {
        name: "Test Name",
        showTitle: "Test Show Name",
        country: "US",
        stateOrProvince: "FL",
        city: "Test City",
        associatedTheater: "Test Theater",

        publicDescription: "Test public description",
        privateDescription: "Test private description",
        accolades: "Test accolades",

        imageUrl: null,
        imageDeleteUrl: null,

        videoUrl1: "youtube.com/test",
        videoUrl2: "youtube.com/test2",
        videoInformation: "Test video information",

        techNeeds: "Test tech needs",
        minimumTime: "69",
        maximumTime: "420",

        contactName: "Test contact name",
        contactEmail: "contact-test@example.com",
        contactPhone: "777-KL5-5555",
        contactRoleId: 3,

        isLocal: null,

        availability: [6, 7],
        socialMedia: [{typeId:2, url:"example.com"}],
        actTypes: [1, 6],
        people: [{name: "Dr. Example", email: "dr@example.com", roleId:3}]
      },
    }
  },
  created() {
    fetch('http://localhost:9000/public/act-types/', { headers: { 'Content-Type': 'application/json'} })
      .then(response=> response.json())
      .then(data=> this.showTypes = data)

    fetch('http://localhost:9000/public/days/', { headers: { 'Content-Type': 'application/json'} })
      .then(response=> response.json())
      .then(data=> this.days = data)

    fetch('http://localhost:9000/public/social-media-types/', { headers: { 'Content-Type': 'application/json'} })
      .then(response=> response.json())
      .then(data=> this.socialMediaTypes = data)

    fetch('http://localhost:9000/public/act-roles/', { headers: { 'Content-Type': 'application/json'} })
      .then(response=> response.json())
      .then(data=> this.actRoles = data)
  }

}
</script>

