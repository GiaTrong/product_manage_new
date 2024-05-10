const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, html) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      // đây là mật khẩu ứng dụng trong phần security => ấn vào xác thực 2 lớp là ra
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "tronghghe172557@fpt.edu.vn",
    to: email,
    subject: subject,
    // text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};
