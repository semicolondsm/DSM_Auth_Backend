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
      subject: `DSM_Auth 이메일 승인코드 to ${userMail}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body style="margin: 30px; border-top: 4px solid #0feea4;">
          <div style="height: 20px;"></div>
          <span>DSM_Auth</span>
          <h1 style="margin-top: 5px"><span style="color: #0feea4">메일인증</span> 안내입니다.</h1>
          <p>
            안녕하세요.<br>
            DSM_Auth 서비스를 이용해 주셔서 진심으로 감사드립니다.<br>
            아래 <span style="color: #0feea4">인증 코드</span>를 확인하여 회원가입을 완료해 주세요.<br>
            감사합니다.
          </p>
          <div 
          style="
            background-color: #0feea4;
            color: #ffffff;
            width: 30%;
            padding: 15px 10px 15px 10px;
            text-align: center;
            border-radius: 3px;
            font-size: xx-large;
          ">${authNum}</div>
        </body>
      </html>
      `,  // html 퍼블리싱 필요 
    }, (err, res) => {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

export { sendMail }