import connectMongo from '../utils/connect-to-mongo'
import Spot from '../models/spot'

// This utils return if the spot we pass is owned by the user we pass

const isAuthor = async (spotID, userID) => {
    await connectMongo()

    const camp = await Spot.findById(spotID).select('author') // only returning author
    const campAuthor = camp.author.valueOf() // stringify objectId

    const isAuthor = campAuthor === userID

    return isAuthor
}

export default isAuthor
