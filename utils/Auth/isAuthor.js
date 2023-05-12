import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';

// This utils return if the spot we passis owned by the user we pass
// Utils for serverSide

const isAuthor = async (spotID, userID) => {
    await connectMongo()

    console.log("SPOTID", spotID)
    console.log("userID", userID)

    const camp = await Spot.findById(spotID).select("author") // only returning author
    const campAuthor = camp.author.valueOf() // stringify objectId

    const isAuthor = campAuthor === userID

    console.log("campAuthor", campAuthor)
    console.log("userIDa", userID)
    console.log("isAuthor", isAuthor)
    return isAuthor
}

export default isAuthor

