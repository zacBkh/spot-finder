import connectMongo from "../connectMongo"
import User from "../../models/user";

// This will get all the spots owned by the user and return them


const getUserSpot = async (userID) => {
    await connectMongo();


    const spotsOwned = await User.findById(userID).select("spotsOwned")

    if (spotsOwned === null) { return { success: false, result: "No User has been found!" } }

    return { success: true, result: spotsOwned.spotsOwned }
}


export default getUserSpot