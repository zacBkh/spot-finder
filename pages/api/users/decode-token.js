import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/user';
import decodeToken from '../../../utils/JWTMailToken/decodeToken';


// Decode a taken and writes in the DB email verified true


export default async function newSpot(req, res) {
    if (req.method === 'POST') {

        // Extracting & decoding token
        const JWToken = req.body;

        // Trying to decode the token
        const decoded = await decodeToken(JWToken)
        console.log("dddd", decoded)

        // If wrong token...
        if (!decoded.success) {
            res.status(401).json({
                success: decoded.success, message: decoded.result
            });

            // If correct token...
        } else {

            res.status(200).json({
                success: decoded.success, message: decoded.result, userID: decoded.userID
            });

            // // Posting to DB user verified
            // await connectMongo();
            // console.log('CONNECTED TO MONGO !');
            // console.log("from inner", decoded.id)
            // const user = await User.findByIdAndUpdate(
            //     decoded.id,
            //     { emailVerified: true },
            //     { runValidators: true, new: true }
            // );

            // res.status(200).json({ success: decoded.success, message: decoded.result, user });
        }






    } else {
        res.status(401).send('You should not try to access this endpoint this way... [verify-email]')
    }
}

