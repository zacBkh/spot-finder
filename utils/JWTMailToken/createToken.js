import jwt from "jsonwebtoken"


const createToken = async (userID, userEmail, expiration) => {
    const token = jwt.sign(
        { _id: userID, email: userEmail },
        process.env.JWT_SECRET,
        { expiresIn: expiration } //seconds
    );

    return token
}

export default createToken