import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { devConfig } from "./../../config/env/dev.config";
import nodemailer from "nodemailer";

interface SendMailOptions extends MailOptions {
  tags?: string[]; 
}

export async function sendmail({ to, subject, html, tags = [] }: SendMailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: devConfig.EMAIL,
      pass: devConfig.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "'Social App' <julianageorgeeshak@gmail.com>",
    to,
    subject,
    html,
  });
  if (tags.length > 0) {
    console.log("Email sent with tags:", tags);
  
  }
}
