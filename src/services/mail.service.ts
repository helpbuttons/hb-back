
import { NotificatioEmail } from "../types";
require('dotenv').config()

export class MailService {

  constructor() { }

  

  async sendNotificationMail(notificationEmail: NotificatioEmail): Promise<object> {
    const nodemailer = require("nodemailer");
    
    const transportOpts = {
      host: process.env.SMTP_HOSTNAME,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE == "true" ? true : false, // true for 465, false for other ports
      auth: {
        type: 'LOGIN',
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    };

    let transporter = nodemailer.createTransport(transportOpts);

    // send mail with defined transport object
    return await transporter.sendMail({
      from: process.env.SMTP_FROM ? process.env.SMTP_FROM : 'Didnt configure the from environment var',
      to: notificationEmail.to,
      subject: notificationEmail.subject,
      text: notificationEmail.content,
      html: "<b>" + notificationEmail.content + "</b>",
    }).then((info :any) => {
      console.log("email sent! to %s subject %s", notificationEmail.to, notificationEmail.subject);
      return info;
    }).catch((err: any) => {
      console.log(err);
      console.log('failed to send email!!');
    });;
  }
}