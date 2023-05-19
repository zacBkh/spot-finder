import connectMongo from '../utils/connect-to-mongo'
import User from '../models/user'

// Posting to DB user verified
const markUserAsVerified = async userID => {
    console.log('USER IDD', userID)

    await connectMongo()

    const user = await User.findByIdAndUpdate(
        userID,
        { emailVerified: true },
        { runValidators: true, new: true },
    )

    return { success: true, result: 'User is now verified', userName: user.name }
}

export default markUserAsVerified
