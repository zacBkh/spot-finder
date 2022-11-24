import connectMongo from '../connectMongo';
import User from '../../models/user';


// Checking if user exists through email for Async validation in forms

const checkEmailExist = async (email) => {

    await connectMongo();

    const queryDB = await User.findOne({ email: email })
    console.log("QUERY DB FROM", queryDB)

    return queryDB
}

export default checkEmailExist




