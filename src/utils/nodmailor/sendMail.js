import dotenv from 'dotenv'
dotenv.config()
import nodemailer from "nodemailer"


    const transporter=nodemailer.createTransport({
  service: "gmail", // or smtp
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })



export  const sendMail=async(to,subject,text)=>{
    try {
        await transporter.sendMail({
            from:`'B.Mart'<${process.env.EMAIL_USER}> `,
      to,
      subject,
      text,
        })
            console.log("✅ Email sent successfully!");

    } catch (error) {
            console.error("❌ Error while sending mail");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Response:", error.response);

    throw error; // important
    }
}