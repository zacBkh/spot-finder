import decodeTokenResetPwd from './decodeToken'

import User from '../../../../models/user'
// Decode Token ONLY FOR PWD RESET

const JWTVerifyer = async JWToken => {
    // Trying to decode the token
    const decoded = await decodeTokenResetPwd(JWToken)
    if (!decoded.success) {
        return { success: decoded.success, result: decoded.result }
    }

    // Return user
    const searchUser = await User.findById(decoded.userID)

    return { success: decoded.success, result: searchUser }
}

export default JWTVerifyer
