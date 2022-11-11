import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/user';
import { hash } from 'bcryptjs';

import sendVerifEmail from '../../../utils/mailer';
import createToken from '../../../utils/JWTMailToken/createToken';


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

                //Hash password
                const hashedPassword = await hash(req.body.password, 12)
                const finalUserData = { ...req.body, password: hashedPassword }
                console.log("finalUserData", finalUserData)

                const newUser = await User.create(finalUserData);
                console.log('CREATED USER -->', newUser);

            
                // Helper fx that creates tokens
                const token = await createToken(newUser._id, newUser.email, "1d")

                // Fx that sends email
                await sendVerifEmail("zachariedupain@hotmail.fr", finalUserData, token)


                // res.status(200).json({ success: true, message: newUser });
                res.status(200).json({ success: true, message: "CHECK YOUR EMAIL ADDRESS TO VERIFY" });
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

