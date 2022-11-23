import decodeToken from "../../../utils/JWTMailToken/decodeToken";

import isUserVerified from "../../../utils/Auth/isUserVerified";

import markUserVerified from "../../../utils/JWTMailToken/markUserAsVerified";

import sendWelcomeEmail from "../../../utils/Mailers/sendWelcomeEmail";




// Decode Token
// Check if user is already verified, if yes STOP if no...
// Verify it on DB + Send Welcome email


export default async function newSpot(req, res) {
    if (req.method === 'POST') {

        // Extracting & decoding token
        const JWToken = req.body;
        console.log("JWToken", JWToken)


        // Trying to decode the token
        const decoded = await decodeToken(JWToken)
        console.log("decoded", decoded)
        if (!decoded.success) {
            return res.status(401).json({ success: decoded.success, result: decoded.result })
        }




        // Check if user is already verified
        const alreadyVerified = await isUserVerified(decoded.userID)
        console.log("alreadyVerified", alreadyVerified)
        if (!alreadyVerified.success) { // if could not find user
            return res.status(400).json({ success: alreadyVerified.success, result: alreadyVerified.result })
        }
        if (alreadyVerified.result) { // if already verified
            return res.status(400).json({ success: alreadyVerified.success, result: "You are already a verified user!" })
        }


        // Mark user as verified
        const verifyUserOnDB = await markUserVerified(decoded.userID) // if not already verified veirfy it
        console.log("verifyUserOnDB", verifyUserOnDB)



        // Send Welcome email
        const { userName } = verifyUserOnDB
        console.log("userNameAA", userName)
        const sendWlc = await sendWelcomeEmail("zachariedupain@hotmail.fr", userName)
        if (!sendWlc.success) { // if failure in sending email
            return res.status(400).json({ success: sendWlc.success, result: sendWlc.result })
        }

        return res.status(200).json({ success: true, result: "Email verification sent!" })



        // If wrong token...
        /*           if (!decoded.success) {
                      res.status(401).json({
                          success: decoded.success, result: decoded.result
                      });
      
                      // If correct token...
                  } else {
      
                      res.status(200).json({
                          success: decoded.success, result: decoded.result, userID: decoded.userID
                      });
                  } */






    } else { // if not POST request...
        res.status(401).send('You should not try to access this endpoint this way... [verify-email]')
    }
}