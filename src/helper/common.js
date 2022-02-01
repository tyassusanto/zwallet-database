const nodemailer = require('nodemailer')
const multer = require('multer')

const notFound = (req, res, next) => {
    res.status(404)
    res.json({
        message : "URL NOT FOUND"
    })
}

const errorHandling = (err, req, res, next) => {
    const statusCode = err.status
    // console.log(err.status);
    const errMessage = err.message
    res.status(statusCode)
    res.json({
        errorMessage : errMessage
    })
}

const response = (res, result, status, message, pagination) => {
    res.json({
        status : 'Success',
        code : status || 200,
        data : result,
        message : message || null,
        pagination
    })
}

const sendEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER, // generated ethereal user
      pass: process.env.PW_EMAIL_SENDER // generated ethereal password
    }
  });
  const info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.EMAIL_SENDER}>`, // sender address
    to: toEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: 'Hello world?', // plain text body
    html: `<b>http://localhost:3500/users/verification/${token}</b>`, // html body // html body
  });
  // console.log(info);
};

// const errorMulter = (req, res) => {
//     upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         res.send(err)
//       } else if (err) {
//         // An unknown error occurred when uploading.
//         res.send(err)
//       }
//       // Everything went fine.
//       console.log(req.file);
//     })
//   }

module.exports = {
    notFound,
    errorHandling,
    response,
    sendEmail,
    // errorMulter
}