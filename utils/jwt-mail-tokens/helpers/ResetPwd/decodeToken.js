import jwt from "jsonwebtoken"

// Util that take a token and tries to decode it FOR RESET PWD
// Anyone can decode a JWT
// Will return : 
/* {
    "_id": "637af33304a40848065c4f73",
    "email": "boris@live.fr",
    "iat": 1669002035,
    "exp": 1669088435
  } */


const decodeTokenResetPwd = async (token) => {
    console.log("FROM TOKEN DECODER...", token)

    console.log("envvv", process.env.JWT_SECRET)

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("decoded", decoded)

        return { success: true, result: `Your token for reset pwd ${decoded.email} is OK!`, userID: decoded._id }


    } catch (error) {
        console.log("Error in decoding token", error)
        return { success: false, result: `There has been an error verifying your token to reset your password: ${error.message}. Try again later.` }
    }
}


export default decodeTokenResetPwd







