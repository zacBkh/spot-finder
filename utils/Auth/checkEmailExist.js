import connectMongo from '../connectMongo';
import User from '../../models/user';


// Checking if user exists through email
const checkEmailExist = async (email) => {

    await connectMongo();

    const queryDB = await User.findOne({ email: email })
    console.log("QUERY DB FROM", queryDB)

    return queryDB
}

export default checkEmailExist




