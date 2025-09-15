import nodemailer from "nodemailer"
export async function sendmail({to,subject,html}:{to:string,subject:string,html:string}) {
    const transporter=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL,
        pass:process.env.PASSWORD
        }
    });
    await transporter.sendMail({
    from:"'social App'<julianageorgeeshak@gmail.com>",
    to,
    subject,
    html
    })

    
}