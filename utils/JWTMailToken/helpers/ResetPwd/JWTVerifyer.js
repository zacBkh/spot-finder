import decodeTokenResetPwd from "./decodeToken";

import connectMongo from "../../../connectMongo";
import User from "../../../../models/user";
// Decode Token ONLY FOR PWD RESET  

const JWTVerifyer = async (JWToken) => {

    console.log("JWToken", JWToken)


    // Trying to decode the token
    const decoded = await decodeTokenResetPwd(JWToken)
    console.log("decoded", decoded)
    if (!decoded.success) {
        return { success: decoded.success, result: decoded.result }
    }

    // Return user
    const searchUser = await User.findById(decoded.userID)
    console.log("++searchUser", searchUser)

    return { success: decoded.success, result: searchUser }






    // // Check if user is already verified
    // const alreadyVerified = await isUserVerified(decoded.userID)
    // console.log("alreadyVerified", alreadyVerified)
    // if (!alreadyVerified.success) { // if could not find user
    //     return { success: alreadyVerified.success, result: alreadyVerified.result }
    // }
    // if (alreadyVerified.result) { // if already verified
    //     return { success: alreadyVerified.success, result: "You are already a verified user!" }
    // }


    // // Mark user as verified
    // const verifyUserOnDB = await markUserAsVerified(decoded.userID) // if not already verified veirfy it
    // console.log("verifyUserOnDB", verifyUserOnDB)



    // Send Welcome email
    const { userName } = verifyUserOnDB
    console.log("userNameAA", userName)
    const sendWlc = await sendWelcomeEmail("zachariedupain@hotmail.fr", userName)
    if (!sendWlc.success) { // if failure in sending email
        return { success: sendWlc.success, result: sendWlc.result }
    }

    return { success: true, result: "Welcome email sent!" }
}

export default JWTVerifyer