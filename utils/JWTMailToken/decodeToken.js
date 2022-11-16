import jwt from "jsonwebtoken"

// Util that take a token and tries to decode it 
const decodeToken = async (token) => {
    console.log("FROM TOKEN DECODER...", token)


    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("decoded", decoded)

        return { success: true, result: `Your email ${decoded.email} has been verified!`, id: decoded._id }


    } catch (error) {
        console.log("Error in decoding token", error)
        return { success: false, result: `There has been an error verifying your email: ${error.message}. Log in to generate new email verification link` }
    }
}


export default decodeToken







