import decodeTokenResetPwd from './decodeToken'

import User from '../../../../models/user'
// Decode Token ONLY FOR PWD RESET

const JWTVerifyer = async JWToken => {
    console.log('JWToken', JWToken)

    // Trying to decode the token
    const decoded = await decodeTokenResetPwd(JWToken)
    console.log('decoded', decoded)
    if (!decoded.success) {
        return { success: decoded.success, result: decoded.result }
    }

    // Return user
    const searchUser = await User.findById(decoded.userID)
    console.log('++searchUser', searchUser)

    return { success: decoded.success, result: searchUser }
}

export default JWTVerifyer
