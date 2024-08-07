import nodemailer from 'nodemailer'
import capitalize from '../../utils/capitalize'

import { PATHS } from '../../constants/URLs'
const { DOMAIN, NEW_SPOT, DOMAIN_WITHOUT_SLASH, PROFILE } = PATHS

const sendWelcomeEmail = async (userRecipient, userName) => {
    console.log('userRecipient', userRecipient)
    console.log('userName', userName)

    if (!userRecipient || !userName) {
        return {
            success: false,
            result: `At least one parameter to send  the email is missing [sendWelcomeEmail]`,
        }
    }

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD,
            },
            port: 587,
            secure: false, // true for 465, false for other ports
        })

        // Only tests connection and authentication but it does not check if the service allows you to use a specific envelope From address or not.
        transporter.verify((error, success) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Server is ready to take our messages')
            }
        })

        const htmlToSend = `
        <h3> Hello ${capitalize(userName)} ! </h3>

        <p> You have just activated your account by verifying your email! </p>
        <p> Welcome to the Spot Finder Community! 🥳 </p>
        <p> 
        Start <a target = "_" href="${DOMAIN_WITHOUT_SLASH}${NEW_SPOT}"> adding new spots here
        </a> or <a target = "_" href="${DOMAIN}"> browse through our amazing existing spots </a> already shared by our community!
        </p>
        <p> You can also <a target = "_" href="${DOMAIN_WITHOUT_SLASH}${PROFILE}"> add a description to your profile </a> to let other members know more abou you 👍
        </p>
        <p>Thank you 👌</p>`

        // send mail with defined transport object
        const mailOptions = await transporter.sendMail({
            from: 'SpotFinder team 👻 <process.env.GOOGLE_USER>', // sender name + address
            to: userRecipient,
            subject: `${capitalize(userName)}, Welcome to SpotFinder! 😍 !`, // Subject line
            html: htmlToSend, // html body
        })

        return { success: true, result: `Welcome email sent!` }
    } catch (error) {
        return {
            success: false,
            result: `There has been an error in sending the welcome email: ${error.stack}`,
        }
    }
}

export default sendWelcomeEmail
