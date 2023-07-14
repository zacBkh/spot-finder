import decodeToken from './helpers/decrypt-token'

import sessionDataLoader from '../../services/data-loader-session'

import markUserAsVerified from '../../services/mark-user-as-verified'

import sendWelcomeEmail from '../../services/emailers-srv/welcome-email'

// Decode Token ONLY FOR EMAIL VERIFICATION
// Check if user is already verified, if yes STOP if no...
// Verify it on DB + Send Welcome email

const JWTVerifyer = async JWToken => {
    // Trying to decode the token
    const decoded = await decodeToken(JWToken)
    console.log('decoded', decoded)
    if (!decoded.success) {
        return { success: decoded.success, result: decoded.result }
    }

    // Check if user is already verified NO ACTUALLY ONLY IF IT EXISTS
    const alreadyVerified = await sessionDataLoader(decoded.userID)
    console.log('alreadyVerified', alreadyVerified)
    if (!alreadyVerified.success) {
        // if could not find user
        return {
            success: alreadyVerified.success,
            result: alreadyVerified.result.emailVerified,
        }
    }
    if (alreadyVerified.result.emailVerified) {
        // if already verified
        return {
            success: alreadyVerified.success,
            result: 'You are already a verified user!',
            userID: alreadyVerified.result._id,
            // userID: 'a',
        }
    }

    // Mark user as verified
    const verifyUserOnDB = await markUserAsVerified(decoded.userID) // if not already verified veirfy it

    // Send Welcome email
    const { userName, userEmail } = verifyUserOnDB
    const sendWlc = await sendWelcomeEmail(userEmail, userName)
    if (!sendWlc.success) {
        // if failure in sending email
        return { success: sendWlc.success, result: sendWlc.result }
    }

    return { success: true, result: 'Welcome email sent!' }
}

export default JWTVerifyer
