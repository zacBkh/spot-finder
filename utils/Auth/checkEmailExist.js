import connectMongo from '../connectMongo';
import User from '../../models/user';


// Checking if user exists (email)
// Return full user, null if does not exist


const checkEmailExist = async (email) => {

    await connectMongo();

    const queryDB = await User.findOne({ email: email })

    return queryDB
}

export default checkEmailExist




