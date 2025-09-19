import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { devConfig } from './../../config/env/dev.config';
import nodemailer from "nodemailer";
export async function sendmail({to,subject,html}:MailOptions) {
    const transporter=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
        user:devConfig.EMAIL,
        pass:devConfig.PASSWORD,
        }
    });
    await transporter.sendMail({
    from:"'social App'<julianageorgeeshak@gmail.com>",
    to,
    subject,
    html
    })

    
}