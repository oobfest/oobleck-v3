let { slug } = require('slug-gen')
let schema = require('./schema')
let database = require('../../database')
let createModel = require('../create-model')
let stripe = require('../stripe/model')
let compileEmailTemplate = require('../../email/compile-email-template')
let sendEmail = require('../../email/send-email')

let actSubmissionConfirmationEmailTemplate = compileEmailTemplate('act-submission-confirmation')

let overrides = {
  getForReview(slug=null, userId=null) {
    if(slug && userId) {
      let act = database
        .prepare(`
          select act.id, act.name, act.showTitle, act.country, act.city, act.stateOrProvince, act.associatedTheater, act.publicDescription, act.PrivateDescription, act.accolades, act.imageUrl, act.videoUrl1, act.videoUrl2, act.videoInformation, review.score, review.notes
          from act
          left join review on act.id = review.actId and review.userId = ?
          where act.slug = ?`)
        .get(userId, slug)
      let people = this.getPeopleForAct(act.id)
      let socialMedia = this.getSocialMediaForAct(act.id)
      return {...act, people, socialMedia}
    }
    else return database
      .prepare(`
        select act.name, act.showTitle, act.slug, count(review.score) as reviewCount
        from act
        join act_to_act_type 
        on act_to_act_type.actId = act.id
        left join review on review.actId = act.id
        where act_to_act_type.actTypeId != 3 and act.isPaid
        group by act.name
        `)
      .all()
  },
  getForStandupReview() {
    return database
      .prepare(`
        select act.name, act.showTitle, act.slug, count(review.score) as reviewCount
        from act
        join act_to_act_type 
        on act_to_act_type.actId = act.id
        left join review on review.actId = act.id
        where act_to_act_type.actTypeId = 3 and act.isPaid
        group by act.name
        `)
      .all()
  },
  getSocialMediaForAct(actId) {
    return database
      .prepare(`
        select social_media.url, social_media_type.name 
        from social_media 
        join social_media_type
        on social_media.socialMediaTypeId = social_media_type.id
        where social_media.actId = ?`)
      .all(actId)
  },
  getPeopleForAct(actId) {
    return database
      .prepare(`
        select person.id, person.name, act_role.name as 'role'
        from person
        join act_to_person
        on act_to_person.personId = person.id
        join act_role
        on act_to_person.actRoleId = act_role.id
        where act_to_person.actId = ?`)
      .all(actId)
  },
  get(slug=null) {
    if(slug) {
      let act = database
        .prepare(`
          select 
            act.id, act.name, act.associatedTheater, act.city, act.stateOrProvince, act.country,
            act.creationDate, act.imageUrl, act.videoUrl1, act.videoUrl2, act.videoInformation,
            act.techNeeds, act.minimumTime, act.maximumTime,
            act.contactName, act.contactPhone, act.contactEmail
          from act 
          where slug = ?`)
        .get(slug)
      let people = this.getPeopleForAct(act.id)
      let socialMedia = this.getSocialMediaForAct(act.id)
      let availability = this.getAvailability(act.id)
      return {...act, people, socialMedia, availability}
    }
    else {
      let acts = database
        .prepare(`
          select act.name, act.showTitle, act.slug, act.id,
          act.country, act.stateOrProvince, act.city, act.associatedTheater
          from act 
          where isPaid = TRUE
          order by name`)
        .all()

      return acts.map(act=> {
        return {
          ...act, 
          actTypes: database
            .prepare(`
              select act_type.name 
              from act_to_act_type
              join act_type
              on act_to_act_type.actTypeId = act_type.id
              where act_to_act_type.actId = ?`)
            .all(act.id)
            .map(act=> act.name)
          }
        })
    }
  },

  getAvailability(actId) {
    return database
      .prepare(`
        select day.name, day.timestamp
        from act_availability
        join day 
        on act_availability.dayId = day.id
        where act_availability.actId = ?`)
      .all(actId)
  },

 // This code is a mess,
 // Always and forever
  async create(data) {

    // Check if they submitted a valid promo code
    let isPaid = data.hasPromoCode && data.promoCode == process.env.PROMO_CODE
    let paymentIntent = null
        
    if(!isPaid) {
      // Stripe Payment Intent
      let castSize = data.people.length
      paymentIntent = await stripe.createSubmissionFeePaymentIntent(castSize)
    }
    
    // act table
    let newActRow = {
      ...data,

      slug: slug(data.name),
      creationDate: Date.now(),
      paymentId: isPaid ? null : paymentIntent.id,
      paymentStatus: 'pending',

      isHeadliner: 0,
      isPaid: isPaid ? 1 : 0,
      isAccepted: 0,
      isConfirmed: 0,
      isLocal: data.isLocal ? 1 : 0
    }

    // Email Archive
    sendEmail(process.env.SUBMISSION_EMAIL, 'New Submission: ' + newActRow.name, `<pre>${JSON.stringify(newActRow, null, 2)}</pre>`)

    let result = database
      .prepare(`
        insert into act (
          name, 
          slug, 
          creationDate, 
          showTitle, 
          country, 
          stateOrProvince, 
          city, 
          associatedTheater, 

          publicDescription, 
          privateDescription, 
          accolades, 

          imageUrl, 
          imageDeleteUrl, 

          videoUrl1, 
          videoUrl2, 
          videoInformation, 

          techNeeds, 
          maximumTime, 
          minimumTime, 

          contactName, 
          contactPhone, 
          contactEmail, 
          contactRoleId, 

          paymentId,
          paymentStatus,

          isHeadliner, 
          isLocal, 
          isPaid, 
          isAccepted, 
          isConfirmed
        )
        values (
          @name, 
          @slug, 
          @creationDate, 
          @showTitle, 
          @country, 
          @stateOrProvince, 
          @city, 
          @associatedTheater, 


          @publicDescription, 
          @privateDescription, 
          @accolades, 

          @imageUrl, 
          @imageDeleteUrl, 

          @videoUrl1, 
          @videoUrl2, 
          @videoInformation, 

          @techNeeds, 
          @maximumTime, 
          @minimumTime, 

          @contactName, 
          @contactPhone, 
          @contactEmail, 
          @contactRoleId, 

          @paymentId,
          @paymentStatus,

          @isHeadliner, 
          @isLocal, 
          @isPaid, 
          @isAccepted, 
          @isConfirmed)`)
      .run(newActRow)

    // Get new act
    let act = database
      .prepare(`select * from act where rowid = ?`)
      .get(result.lastInsertRowid)

    // act_availability
    let createActAvailability = database.prepare(`insert into act_availability (actId, dayId) values (?, ?)`)
    data.availability.map(dayId=> createActAvailability.run(act.id, dayId))

    // act_to_act_type
    let createActToActType = database.prepare(`insert into act_to_act_type (actId, actTypeId) values (?, ?)`)
    data.actTypes.map(actTypeId=> createActToActType.run(act.id, actTypeId))


    // Insert if email doesn't already exist
    // Update if new phone value isn't null
    let createPerson = database
      .prepare(`
        insert into person (name, email, phone, isConfirmed)
        values (?, ?, ?, FALSE)
        on conflict (email)
        do update set phone = excluded.phone
        where excluded.phone is not NULL`)

    // First, create from contact
    createPerson.run(data.contactName, data.contactEmail, data.contactPhone)

    // Then create from cast & crew
    data.people.map(person=> createPerson.run(person.name, person.email, null))

   // act_to_person
    let createActToPerson = database.prepare(`insert into act_to_person (actId, personId, actRoleId) values (?, ?, ?)`)
    let people = database.prepare(`select * from person`).all()
    data.people.map(person=> {
      let newPerson = people.find(p=> p.email == person.email)
      createActToPerson.run(act.id, newPerson.id, person.roleId)
    })

    // social_media
    let createSocialMedia = database.prepare(`insert into social_media (actId, socialMediaTypeId, url) values (?, ?, ?)`)
    data.socialMedia.map(social=> createSocialMedia.run(act.id, social.typeId, social.url))

    if(isPaid) {
      // Send confirmation email
      let emailHtml = actSubmissionConfirmationEmailTemplate(act)
      sendEmail(act.contactEmail, `Application for ${act.name} has been received`, emailHtml)
      return { ok: true }
    }
    else {
      return paymentIntent
    }
  },
  markPayment(paymentId) {
    let result = database
      .prepare(`
        update act
        set paymentStatus = 'succeeded', isPaid = 1
        where paymentId = ?`)
      .run(paymentId)

    let act = database
      .prepare(`
        select name, contactName, contactEmail
        from act
        where paymentId = ?`)
      .get(paymentId)

    let emailHtml = actSubmissionConfirmationEmailTemplate(act)
    sendEmail(act.contactEmail, `Application for ${act.name} has been received`, emailHtml)

    return result
  }
}

module.exports = createModel(schema, overrides)
