import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/user';
import { Error } from 'mongoose';


// Checking if user exists through email
const checkUserExists = async (emailToCheck) => {
    const queryDB = await User.findOne({ email: emailToCheck })
    return queryDB
}


export default async function newSpot(req, res) {
    if (req.method === 'POST') {
        try {
            await connectMongo();
            console.log('CONNECTED TO MONGO !');
            console.log("bodypayloadfrom API ROUTE", req.body)
            const { email } = req.body;


            if (!await checkUserExists(email)) { // if user does not exist, create it
                console.log("THE USER WITH EMAIL", email, "DOES NOT EXIST YET")
                
                const newUser = await User.create(req.body);
                console.log('CREATED USER -->', newUser);
                res.status(200).json({ success: true, message: newUser });
            } else {
                res.status(422).json({ success: false, message: 'User already exists' });
            }


        } catch (error) {
            console.log("Error happenned in user creation", error);
            res.status(401).json({ error });
        }






    } else {
        res.status(401).send('You are already authenticated but you should not try to access this endpoint this way... [create New User]')
    }
}

