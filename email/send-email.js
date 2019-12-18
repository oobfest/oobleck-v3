let nodemailer = require('nodemailer')
let aws = require('aws-sdk')

// TODO
// Include AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_REGION
// And `require('dotenv').config()`

let transporter = nodemailer.createTransport({
  SES: new aws.SES({apiVersion: "2010-12-01"}),
  sendingRate: 1
})

let sendEmail = function(to, subject, html, from="no-reply@oobfest.com") {
  return transporter
    .sendMail({ to, from, subject: "[OoB] " + subject, html })
    .then(response=> console.info(`
      💌 "${subject}" from ${response.envelope.from} to ${response.envelope.to}`))
    .catch(error=> console.error(error))
}

module.exports = sendEmail
