<template lang="pug">
div
  .image-box.crocodile-nasties
    h2 2020 Performer Application
  h3 Thank you for applying to Out of Bounds!

  div(v-show="!submitted")
    p Our festival doesn't work unless we have performers, so thanks!
    h4 Important Dates
    p: ul
      li This year's festival will be from 
        strong September 1
          sup st
        |  to 
        strong September 7
          sup th
      li Acceptance emails will be sent out in June 
      li The last day to apply to the festival wil be on 
        strong March 31
          sup st
    h4 Application Fee
    p: ul
      li Solo or duo acts: $15 before March 1st, $25 after
      li 3+ people: $35 before March 1st, $45 after

    h4 Act Details
    label.required Name
    input(type="text" v-model="newAct.name")
    label Show Title
    small Only fill this out if your show title is different from your group or performer name!
    input(type="text" v-model="newAct.showTitle")

    h4.required Show Type
    p Select all that apply.
    p
      label.checkbox(v-for="showType in showTypes")
        input(type="checkbox" v-model="newAct.actTypes" :value="showType.id")
        | {{showType.name}}

    h4 Show Description
    label.required Describe Your Act to Us
    small This is meant to persuade reviwers and won't be visible to the public. What makes your act special?
    textarea(v-model="newAct.privateDescription")
    label.required Describe Your Act to The Public
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

    label.required City
    input(type="text" v-model="newAct.city")

    label What individual venue, theater or club are you associated with? Leave blank if more than one or not applicable.
    small Just a single name is needed. Please do not write a short story about how and why no one place truly represents you.
    input(type="text" v-model="newAct.associatedTheater")

    h4.required Image Upload
    p Accepted acts will have their submitted photo used for the festival website, trading cards and programs. 
    div(v-if="imageUrl")
      img(:src="imageUrl")
      button.danger(@click="deleteImage") Delete
    div(v-else)
      div(v-if="uploadingImage")
        p Uploading Image...
      div(v-else)
        p: ul
          li Photos or graphics only. There should be no text in the image!
          li Image should be 
            em at least 
            |  600 × 600 pixels
          li File size under 10MB (use JPEG)
      image-upload(v-show="!uploadingImage" @image-uploaded="imageUploaded" @uploading-image="uploadingImage=true")

    h4.required Cast and Crew
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
    label.required Name
    input(type="text" v-model="newAct.contactName")

    label.required Email
    input(type="email" v-model="newAct.contactEmail")

    label.required Phone Number
    input(type="tel" v-model="newAct.contactPhone")

    label.required Role
    select(v-model="newAct.contactRoleId")
      option(v-for="actRole in actRoles" :value="actRole.id") {{actRole.name}}

    h4 Performance Requirements
    label.required What is the shortest set (in minutes) you would be willing to do for the festival?
    input(type="number" v-model="newAct.minimumTime")
    label.required What is the longest (in minutes) you would be able to perform for?
    input(type="number" v-model="newAct.maximumTime")
    label What special needs will your act require? For example, video projection, sound effects, props that you can't bring yourself and if you need us to provide a musician. Please be specific!
    textarea(v-model="newAct.techNeeds")

    p: label.checkbox
      input(type="checkbox" v-model="noFood")
      | This show will not make a mess on stage with food, liquids or anything else.

    h4 Video URLs
    p If you are standup, submit an unedited 5-15 minute video from a recent performance.
    p Otherwise, please submit at least one unedited, full-length video of a performance of the act you intend to bring to Out of Bounds. It should be at least 20 minutes long and less than one year old.
    p Video sketches and other fully-edited videos are not accepted. Do not submit a video of a show different from the one you would be performing at Out of Bounds.
    label.required Video URLs (only one required)
    input(type="text" v-model="newAct.videoUrl1")
    | 
    input(type="text" v-model="newAct.videoUrl2")
    label Does your video require a password or any other additonal information? Leave blank if not.
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

    h4.required Availability
    p Which days of the festival are you able to attend? 
    p Availability beyond Friday & Saturday will 
      em greatly increse
      |  your chances of getting accepted.
    p
      label.checkbox(v-for="day in days")
        input(type="checkbox" v-model="newAct.availability" :value="day.id")
        | {{day.timestamp | formatTime}}

    h4.required Travel Agreement
    p If you are from out of town, we will need your travel information at least 30 days before the festival. Will you be able to provide this? Failure to do so can result in your act being pulled.
    select(v-model="newAct.isLocal")
      option(:value="null") ---
      option(:value="false") Yes
      option(:value="true") We're local!

    h4 Promo Code
    p: label.checkbox
      input(type="checkbox" v-model="hasPromoCode")
      | I have a promo code
    div(v-show="hasPromoCode")
      label Promo Code
      input(type="text" v-model="newAct.promoCode")

    .text-align-center
      button(@click="submit" v-show="!submitting") Submit
      p(v-show="submitting") Submitting...
      | &nbsp;
      button(@click="fake" v-show="false") Fake It

    div(v-show="validationErrors.length > 0")
      p Before submitting, please fix the following: 
      ul
        li(v-for="error in validationErrors") {{error}}
  div(v-show="submitted")
    div(v-if="hasPromoCode")
      p Your application is complete! ✅ A confirmation email has been sent to 
        code {{newAct.contactEmail}}
        | .
    div(v-else)
      p Give us your monies
      h4 Application Fee
      stripe(:client-info="clientInfo" :contact-info="contactInfo" :cost="cost" @payment-succeeded="paymentSucceeded")

</template>

<script>
import moment from 'moment'
import imageUrl from '@/mixins/imageUrl'
import ImageUpload from '@/components/ImageUpload'
import CountryDropdown from '@/components/CountryDropdown'
import StateDropdown from '@/components/StateDropdown'
import SocialMedia from '@/components/SocialMedia'
import Person from '@/components/Person'
import Stripe from '@/components/Stripe'

export default {
  mixins: [imageUrl],
  components: { ImageUpload, CountryDropdown, StateDropdown, SocialMedia, Person, Stripe },
  filters: {
    formatTime(timestamp) {
      return moment(timestamp).format('dddd, MMMM Do')
    }
  },
  methods: {
    moment,
    fake() {
      this.newAct.name = "Garfield"
      this.newAct.actTypes = [1]
      this.newAct.privateDescription = "Fake"
      this.newAct.publicDescription = "Fake"
      this.newAct.city = "Fake"
      this.newAct.imageUrl = "https://i.imgur.com/iyI5Xag.jpg"
      this.newAct.imageDeleteUrl = "https://i.imgur.com/iyI5Xag.jpg"
      this.newAct.city = "Fake"
      this.newAct.people.push({ name: "Garfield", email: "garf@example.com" })
      this.newAct.contactName = "John Arbuckle"
      this.newAct.contactEmail = "john@example.com"
      this.newAct.contactPhone = "777"
      this.newAct.contactRoleId = 1
      this.noFood = true
      this.newAct.videoUrl1 = "https://www.youtube.com/"
      this.newAct.availability = [1, 2, 3]
      this.newAct.isLocal = true
    }, 
    paymentSucceeded(paymentId) {
      this.$http('acts/mark-payment', 'POST', { paymentId })
        .then(response=> { /* success! */ })
        .catch(error=> console.log(error))
    },
    imageUploaded(imageData) {
      this.newAct.imageUrl = imageData.id
      this.newAct.imageDeleteUrl = imageData.deletehash
      this.imageUrl = this.getImageUrl(imageData.id, 'large-thumbnail')
      this.deleteImageUrl = this.getDeleteImageUrl(imageData.deletehash)
      this.uploadingImage = false
    },
    deleteImage(){
      window.open(this.deleteImageUrl, '_blank')
      this.newAct.imageUrl = null
      this.newAct.imageDeleteUrl = null
      this.imageUrl = null
      this.deleteImageUrl = null
    },
    async validate() {
      let validationErrors = []

      if(this.newAct.name == '') validationErrors.push('Act name is required')
      if(this.newAct.actTypes.length <= 0) validationErrors.push('Please select at least one show type')
      if(this.newAct.privateDescription == "") validationErrors.push('Please include a show description for review')
      if(this.newAct.publicDescription == "") validationErrors.push('Please include a show description for publishing')
      if(this.newAct.city == "") validationErrors.push('Please include what city you are from')
      if(this.newAct.imageUrl == null) validationErrors.push('Image upload is required')
      if(this.newAct.people.length == 0) validationErrors.push('Please include the cast & crew of who will be attending the festival')
      for(let person of this.newAct.people) {
        if(person.name =='' || person.email == '') validationErrors.push('Cast and crew details are missing')
        break
      }
      if(this.newAct.contactName == '') validationErrors.push('Contact name is required')
      if(this.newAct.contactEmail == '') validationErrors.push('Contact email is required')
      if(this.newAct.contactPhone == '') validationErrors.push('Contact phone is required')
      if(this.newAct.contactRoleId == null) validationErrors.push('Contact role is required')
      if(this.noFood == false) validationErrors.push('Please agree under "Performance Requirements" to not make a mess!')
      if(this.newAct.videoUrl1 == "" && this.newAct.videoUrl2 == "") validationErrors.push('Please include at least one video for review')
      for(let social of this.newAct.socialMedia) {
        if(social.url == '') validationErrors.push('Social media url is blank')
        break
      }
      if(this.newAct.availability.length <= 0) validationErrors.push('Please include what days you are able to attend the festival')
      if(this.newAct.isLocal == null) validationErrors.push('Please respond to the travel agreement')

      if(this.hasPromoCode) {
        let { ok } = await this.$http('promo-code/check-promo-code', 'POST', {promoCode: this.newAct.promoCode} )
        if(!ok) validationErrors.push("Invalid promo code")
      }

      this.validationErrors = validationErrors
    },
    async submit() {
      this.submitting = true
      await this.validate()
      if(this.validationErrors.length <=0) {
        this.$http('acts', 'POST', { ...this.newAct, hasPromoCode: this.hasPromoCode } )
          .then(data=> {
            if(!this.hasPromoCode) this.clientInfo = data.client_secret
            this.submitted = true
          })
          .catch(error=> alert("There was an error submitting your application. Please try again later!"))
      }
      else this.submitting = false
    }
  },
  data() {
    return {
      hasPromoCode: false,
      imageUrl: null,
      imageDeleteUrl: null,
      clientInfo: null,
      submitting: false,
      submitted: false,
      uploadingImage: false,
      validationErrors: [],
      seeExample: false,
      showTypes: [],
      days: [],
      noFood: false,
      socialMediaTypes: [],
      actRoles: [],
      newAct: {
        name: "",
        showTitle: null,
        country: "US",
        stateOrProvince: "TX",
        city: "",
        associatedTheater: "",

        publicDescription: "",
        privateDescription: "",
        accolades: "",

        imageUrl: "",
        imageDeleteUrl: "",

        videoUrl1: "",
        videoUrl2: "",
        videoInformation: "",

        techNeeds: "",
        minimumTime: 0,
        maximumTime: 0,

        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactRoleId: null,

        isLocal: null,
        promoCode: null,

        availability: [],
        socialMedia: [],
        actTypes: [],
        people: []
      },
    }
  },
  computed: {
    cost() {
      return `$${this.newAct.people.length >= 3 ? 45 : 25}.00`
    },
    contactInfo() {
      return {
        name: this.newAct.contactName,
        email: this.newAct.contactEmail,
        phone: this.newAct.contactPhone
      }
    }
  },
  created() {
    this.$http('act-types')
      .then(data=> this.showTypes = data)

    this.$http('days')
      .then(data=> this.days = data)

    this.$http('social-media-types')
      .then(data=> this.socialMediaTypes = data)

    this.$http('act-roles')
      .then(data=> this.actRoles = data)
  }
}
</script>
