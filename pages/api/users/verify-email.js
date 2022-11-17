import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/user';
import decodeToken from '../../../utils/JWTMailToken/decodeToken';

import sendWelcomeEmail from '../../../utils/Mailers/sendWelcomeEmail';

// Decode a taken and writes in the DB email verified true


export default async function newSpot(req, res) {
    if (req.method === 'POST') {



        // Extracting & decoding token
        const JWToken = req.body;
        console.log("JWT Token from API route222", JWToken)


        // Trying to decode the token
        const decoded = await decodeToken(JWToken)

        // If wrong token...
        if (!decoded.success) {
            res.status(401).json({
                success: decoded.success, message: decoded.result
            });

            // If correct token...
        } else {
            res.status(200).json({ success: decoded.success, message: decoded.result });

            // Posting to DB user verified
            await connectMongo();
            console.log('CONNECTED TO MONGO !');
            console.log("from inner", decoded.id)
            const user = await User.findByIdAndUpdate(
                decoded.id,
                { emailVerified: true },
                { runValidators: true, new: true }
            );



            // Fx that sends email to Welcome
            const sender = await sendWelcomeEmail("zachariedupain@hotmail.fr", user.name)
            if (!sender.success) {
                res.status(400).json({ success: sender.success, message: sender.result });
            } else {
                res.status(200).json({ success: sender.success, message: sender.result });
            }
        }







    } else {
        res.status(401).send('You should not try to access this endpoint this way... [verify-email]')
    }
}

