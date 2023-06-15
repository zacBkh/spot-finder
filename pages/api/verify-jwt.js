import decodeToken from '../../utils/jwt-mail-tokens/helpers/decrypt-token'
import sessionDataLoader from '../../services/data-loader-session'
import markUserAsVerified from '../../services/mark-user-as-verified'
import sendWelcomeEmail from '../../services/emailers-srv/welcome-email'

// USE for Async valid in logger

// Function return values
// TRUE : EMAIL DOES NOT EXIST YET IN DB
// FALSE : EMAIL ALREADY EXIST!

export default async function verifyJWT(req, res) {
    const jwtToken = req.body

    if (req.method !== 'POST') {
        res.status(401).send(
            'You should not try to access this endpoint this way... [verify-JWT]',
        )
    }

    const decoded = await decodeToken(jwtToken)
    console.log('decoded', decoded)
    if (!decoded.success) {
        res.status(401).json({
            success: decoded.success,
            result: decoded.result,
        })
        return
    }

    // Check if user is already verified NO ACTUALLY ONLY IF IT EXISTS
    const alreadyVerified = await sessionDataLoader(decoded.userID)
    console.log('alreadyVerified', alreadyVerified)
    if (!alreadyVerified.success) {
        // if could not find user
        res.status(401).json({
            success: alreadyVerified.success,
            result: alreadyVerified.result.emailVerified,
        })
        return
    }
    if (alreadyVerified.result.emailVerified) {
        // if already verified
        res.status(401).json({
            success: true,
            result: 'You are now a verified member! Check your emails.',
        })
        return
    }

    // Mark user as verified
    const verifyUserOnDB = await markUserAsVerified(decoded.userID) // if not already verified veirfy it
    console.log('verifyUserOnDB', verifyUserOnDB)

    // Send Welcome email
    const { userName } = verifyUserOnDB
    console.log('userNameAA', userName)
    const sendWlc = await sendWelcomeEmail('zachariedupain@hotmail.fr', userName)
    if (!sendWlc.success) {
        // if failure in sending email
        res.status(404).json({
            success: sendWlc.success,
            result: sendWlc.result,
        })
        // return { success: sendWlc.success, result: sendWlc.result }
    }

    res.status(201).json({
        success: true,
        result: 'Welcome email sent from API ROUTE',
    })

    // return { success: true, result: 'Welcome email sent!' }
}
