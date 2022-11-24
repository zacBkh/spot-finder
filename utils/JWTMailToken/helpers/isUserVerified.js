
import connectMongo from "../connectMongo";
import User from "../../models/user";




export default async function isUserVerified(req, res) {

    const userID = req.body;

    await connectMongo();

    const isVerifiedQuery = await User.findById(userID).select("emailVerified -_id")


    if (isVerifiedQuery === null) { // If could not find user...

        res.status(400).json({ success: false, result: "Could not identify user" })


    } else { // If could find user

        const isVerified = isVerifiedQuery.emailVerified // true if user already verified

        res.status(200).json({ success: true, result: isVerified })
    }

}





