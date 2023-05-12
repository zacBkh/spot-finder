import jwt from "jsonwebtoken"


// 24h validity


const createToken = async (userID, userEmail, expiry) => {
    try {
        const token = jwt.sign(
            { _id: userID, email: userEmail },
            process.env.JWT_SECRET,
            { expiresIn: expiry } //seconds
        );
        return { success: true, result: token }

    } catch (error) {
        return { success: false, result: `There has been an error generating a token: ${error.message}` }
    }

}
export default createToken

