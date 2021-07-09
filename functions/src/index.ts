import * as functions from "firebase-functions";
const nodemailer = require("nodemailer");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6bbbdeacc37fc3",
    pass: "b7c229bbe00bd2",
  },
});

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase ES2015!");
// });

export const emailSender = functions.https.onCall((data, res) => {
  const mailOptions = {
    from: "noveminfo@gmail.com", //Adding sender's email
    to: data.email, //Getting recipient's email by query string
    subject: "エントリー受けました", //Email subject
    text: `
    ${data.name}様

    エントリー誠にありがとうございます。
    以下の内容を受けました。

    お名前： ${data.name}
    年齢： ${data.age}
    メールアドレス： ${data.email}
    希望職種： ${data.job}
    希望理由： ${data.reason}

    以上、
    よろしくお願いいたします。
    `, //Email content in HTML
  };

  return transport.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      return console.log(err.toString());
    }
    return console.log("Email sent successfully");
  });
});
