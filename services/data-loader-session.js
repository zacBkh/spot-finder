import connectMongo from '../utils/connect-to-mongo'
import User from '../models/user'

// Check if user completed the verification process
const sessionDataLoader = async userID => {
    await connectMongo()

    const loadedDataSession = await User.findById(userID).select(
        'emailVerified profilePic',
    )

    if (loadedDataSession === null) {
        // If could not find user...
        return {
            success: false,
            result: 'Could not identify user',
        }
    } else {
        // If could find user
        return {
            success: true,
            result: loadedDataSession,
        }
    }
}

export default sessionDataLoader
