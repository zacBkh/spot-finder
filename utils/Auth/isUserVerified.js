import connectMongo from "../connectMongo";
import User from "../../models/user";

const isUserVerified = async (userID) => {

    await connectMongo();

    const isVerified = await User.findById(userID).select("emailVerified")

    console.log("miracle", isVerified) // will return obj with obect ID

    if (isVerified === null) { // If could not find user...
        return {
            success: false, result: "Could not identify user"
        }


    } else { // If could find user
        return {
            success: true, result: isVerified.emailVerified
        }
    }

}

export default isUserVerified



