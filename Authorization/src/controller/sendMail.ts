import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env")});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASSWORD 
  }
});

const sendMail = (userMail: string, authNum: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: userMail,
      subject: "test email",
      html: `
      <div style="background: red">asdf</div>
      <h1>Hello</h1>
      <h1>${userMail}</h1>
      <h2>${authNum}</h2>
      `,  
    }, (err, res) => {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

export { sendMail }