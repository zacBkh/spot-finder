import jwt from "jsonwebtoken"





const decodeToken = async (token) => {
    console.log("FROM TOKEN DECODER...", token)
    console.log("FROM TOKEN DECODER++...", typeof token)
    
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    return decoded
}



export default decodeToken


// const expDate = new Date(decoded.exp * 1000)
// const createdDate = new Date(decoded.iat * 1000)


// return {
//     JWTEncoded: token,
//     JWTDecoded: {
//         ...decoded,
//         iat: createdDate.toLocaleString(),
//         exp: expDate.toLocaleString()
//     },
// };






