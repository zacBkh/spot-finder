import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/user';
import decodeToken from '../../../utils/JWTMailToken/decodeToken';





export default async function newSpot(req, res) {
    if (req.method === 'POST') {

        try {

            // Extracting & decoding token
            const JWToken = req.body;
            console.log("JWT Token from API route222", JWToken)

            
            try {
                await decodeToken(JWToken)
            } catch (error) {
                console.log("There has been an error while validating your token -->", error)
            }

            // Posting to DB
            await connectMongo();
            console.log('CONNECTED TO MONGO !');

            res.status(200).json({ success: true, message: "EMAIL VERIFIED" });


        } catch (error) {
            console.log("Error happenned in email verif", error);
            res.status(401).json({ error });
        }


    } else {
        res.status(401).send('You should not try to access this endpoint this way... [verify-email]')
    }
}

