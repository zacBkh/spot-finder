
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";




export default async function isUserVerified(req, res) {

    const userID = req.body;

    await connectMongo();

    const isVerified = await User.findById(userID).select("emailVerified")
    console.log("isVerifiedPPPP", isVerified) // will return obj with obect ID and boolean


    if (isVerified === null) { // If could not find user...

        res.status(400).json({ success: false, result: "Could not identify user" })


    } else { // If could find user
        res.status(200).json({ success: true, result: isVerified.emailVerified })
    }

}





