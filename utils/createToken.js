import jwt from "jsonwebtoken"


const createToken = async (userID, userEmail, expiration) => {
    const token = jwt.sign(
        { _id: userID, email: userEmail },
        process.env.JWT_SECRET,
        { expiresIn: expiration } //seconds
    );


    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );


    const expDate = new Date(decoded.exp * 1000)
    const createdDate = new Date(decoded.iat * 1000)


    return {
        JWTEncoded: token,
        JWTDecoded: {
            ...decoded,
            iat: createdDate.toLocaleString(),
            exp: expDate.toLocaleString()
        },
    };

}

export default createToken