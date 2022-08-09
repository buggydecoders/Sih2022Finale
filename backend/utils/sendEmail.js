const nodemailer = require('nodemailer');

const sendEmail = (reciever, data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.Email_Pass,
    },
  });
  var mailOptions = {
    from: process.env.ADMIN_MAIL, // sender address
    to: `${reciever}`, // list of receivers
    subject: `Reset Password`,
    html : `<h1><a href=${process.env.CLIENT_URL}/resetPassword/${data.token}>Reset Password</a></h1>`    
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

module.exports = { sendEmail };