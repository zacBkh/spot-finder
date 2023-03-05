import nodemailer from 'nodemailer'
import capitalize from '../capitalize'

import { whichDomain } from '../env-helper'
const sendPwdResetEmail = async (userRecipient, userName, token) => {
    const currDomain = whichDomain()

    console.log('currDomain', currDomain)
    console.log('userRecipient', userRecipient)
    console.log('userName', userName)
    console.log('token', token)

    if (!userRecipient || !userName || !token) {
        return {
            success: false,
            result: `At least one parameter to send the email is missing [sendPwdReset email]`,
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
        <h3>Hello ${capitalize(userName)}!</h3>
        <p>You asked to reset your password.</p>
        <p>Please follow this link : <a href="${currDomain}/auth/VerifyResetPwd/${token}"> to reset your password</a></p>
        <p>Thank you.</p>

        `

        // send mail with defined transport object
        const mailOptions = await transporter.sendMail({
            from: 'Spot Finder team 👻 <process.env.GOOGLE_USER>', // sender address
            // from: process.env.GOOGLE_USER,
            to: userRecipient,
            subject: `${capitalize(userName)}, reset your Spot Finder password ✔ !`, // Subject line
            text: 'Hello world?', // plain text body
            html: htmlToSend, // html body
        })

        return {
            success: true,
            result: `Check your emdails to reset your password!`,
        }
    } catch (error) {
        return {
            success: false,
            result: `There has been an error in sending the email: ${error.message}, ${error.stack}`,
        }
    }
}

export default sendPwdResetEmail
