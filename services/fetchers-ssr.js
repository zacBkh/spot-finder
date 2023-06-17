// Utils fx that fetch DB without passing through API routes(useless) since we are using getServerSideProps to deliver all spots and one spot

import connectMongo from '../utils/connect-to-mongo'
import Spot from '../models/spot'

// All spots
export const GETSpotFetcherAll = async () => {
    await connectMongo()

    const res = await Spot.find({})
        .populate('author', 'name profilePic.link provider') // Populating ONLY author name
        .populate('reviews')
    const allSpots = JSON.parse(JSON.stringify(res))
    return allSpots
}

// Show page of one Spot
export const GETSpotFetcherOne = async ID => {
    await connectMongo()

    const response = await Spot.findById(ID)
        .populate('author', 'name profilePic.link provider') // Populating ONLY author name
        .populate({
            path: 'reviews',
            // Get reviewAuthor of every reviews - populate the 'reviewAuthor' field for every reviews but with only reviewer name - deep population
            populate: { path: 'reviewAuthor', select: 'name profilePic' },
        })

    // .populate('reviews')
    const indivSpot = JSON.parse(JSON.stringify(response))

    return indivSpot
}
