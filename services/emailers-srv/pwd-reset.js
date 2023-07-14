import nodemailer from 'nodemailer'
import capitalize from '../../utils/capitalize'
import { PATHS } from '../../constants/URLs'
const sendPwdResetEmail = async (userRecipient, userName, token) => {
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
        <p>You asked to reset your password. 🔐</p>
        <p>Please follow <a href="${
            PATHS.DOMAIN_WITHOUT_SLASH
        }/auth/verify-reset-pwd/${token}"> this link to reset your password</a></p>
        <p>For security reasons, this link will only be valid for one 24 hours. ⏳ </p>
        <p>Thank you 👌</p>
        `

        // send mail with defined transport object
        const mailOptions = await transporter.sendMail({
            from: 'SpotFinder team 👻 <process.env.GOOGLE_USER>', // sender address
            // from: process.env.GOOGLE_USER,
            to: userRecipient,
            subject: `${capitalize(userName)}, reset your Spot Finder password! 🔒`, // Subject line
            html: htmlToSend, // html body
        })

        return {
            success: true,
            result: `Check your emails to reset your password!`,
        }
    } catch (error) {
        return {
            success: false,
            result: `There has been an error in sending the email: ${error.message}, ${error.stack}`,
        }
    }
}

export default sendPwdResetEmail
