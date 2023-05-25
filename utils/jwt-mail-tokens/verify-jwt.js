import decodeToken from './helpers/decrypt-token'

import isUserVerified from '../../services/is-user-verified'

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

    // Check if user is already verified
    const alreadyVerified = await isUserVerified(decoded.userID)
    console.log('alreadyVerified', alreadyVerified)
    if (!alreadyVerified.success) {
        // if could not find user
        return { success: alreadyVerified.success, result: alreadyVerified.result }
    }
    if (alreadyVerified.result) {
        // if already verified
        return {
            success: alreadyVerified.success,
            result: 'You are already a verified user!',
        }
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
        return { success: sendWlc.success, result: sendWlc.result }
    }

    return { success: true, result: 'Welcome email sent!' }
}

export default JWTVerifyer
