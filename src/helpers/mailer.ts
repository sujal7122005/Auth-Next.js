import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/src/models/userModel';

export const sendEmail = async (email: string, subject: string, userId:any) => {

    try {
        const hashedUserId = await bcryptjs.hash(userId.toString(), 10);
        if (subject === "Verification Email") {
            
            await User.findByIdAndUpdate(userId, 
                { $set: { 
                    verificationToken: hashedUserId,
                    verificationTokenExpiry: Date.now() + 3600000 // Token expires in 1 hour 
                }});
        }else if (subject === "Reset Password") {
            
            await User.findByIdAndUpdate(userId, 
                { $set: { 
                    forgotPasswordToken: hashedUserId,
                    forgotPasswordTokenExpiry: Date.now() + 3600000 // Token expires in 1 hour 
                }});
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || "2525"),
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS
        }
        });
        const mailOptions = {
            from: 'sujalpatel6624@gmail.com',
            to: email,
            subject: subject === "Verification Email" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedUserId}">here</a> to ${subject === "Verification Email" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedUserId}
            </p>`
        };
        const info = await transport.sendMail(mailOptions);
        console.log("Email sent: " + info.response);


    } catch (error) {
        console.error("Error sending email:", error);
    }
}



