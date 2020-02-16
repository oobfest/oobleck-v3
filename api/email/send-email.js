let nodemailer = require('nodemailer')
let aws = require('aws-sdk')

let transporter = nodemailer.createTransport({
  SES: new aws.SES({apiVersion: "2010-12-01"}),
  sendingRate: 1
})

let sendEmail = async function(to, subject, html, from="no-reply@oobfest.com") {
  return transporter
    .sendMail({ to, from, subject: "[OoB] " + subject, html })
    .then(response=> console.info(`
      💌 "${subject}" from ${response.envelope.from} to ${response.envelope.to}`))
    .catch(error=> console.error(error))
}

module.exports = sendEmail
