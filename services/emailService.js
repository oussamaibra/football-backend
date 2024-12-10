// const nodemailer = require("nodemailer");



// const sendMail = async (mailOptions) => {


//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.email,
//       pass: process.env.password,
//     },
//   });

//   mailOptions.from = process.env.email;
  

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// module.exports = sendMail;
