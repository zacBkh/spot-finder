
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";



// Posting to DB user verified
export default async function markUserVerified(req, res) {

    const userID = req.body;

    await connectMongo();


    const user = await User.findByIdAndUpdate(
        userID,
        { emailVerified: true },
        { runValidators: true, new: true }
    );

    res.status(200).json({ success: true, message: "User is now verified", userName: user.name });
}






