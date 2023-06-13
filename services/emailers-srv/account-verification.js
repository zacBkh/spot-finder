import nodemailer from 'nodemailer'
import capitalize from '../../utils/capitalize'

import { whichDomain } from '../../utils/env-helper'
const currDomain = whichDomain()

const sendVerifEmail = async (userRecipient, userData, token) => {
    if (!userRecipient || !userData || !token) {
        return {
            success: false,
            result: `At least one parameter to send the email is missing [sendVerifEmail]`,
        }
    }

    try {
        const { name } = userData

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
        <h3> Hello ${capitalize(name)} ! </h3>
        <p> Thanks for registering. Just one more step... 🙏 </p>
        <p> To activate your account, please follow this link : 
        <a target = "_" href="${currDomain}/auth/verify-your-email/${token}"> Activate my Account 
        </a> </p>
        <p> Thank you! 👌</p>`

        // send mail with defined transport object
        const mailOptions = await transporter.sendMail({
            from: 'SpotFinder team 👻 <process.env.GOOGLE_USER>', // sender address
            to: userRecipient,
            subject: `${capitalize(name)}, activate your Spot Finder Account 🤙 !`, // Subject line
            html: htmlToSend, // html body
        })

        return {
            success: true,
            result: `Check your emails to verify your account!`,
        }
    } catch (error) {
        return {
            success: false,
            result: `There has been an error in sending the email: ${error.message}, ${error.stack}`,
        }
    }
}

export default sendVerifEmail
