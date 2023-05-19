import connectMongo from '../../../utils/connect-to-mongo'
import Review from '../../../models/reviews'
import Spot from '../../../models/spot'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function APIHandler(req, res) {
    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)
    // If not authenticated
    if (!session) {
        res.status(401).json({
            success: false,
            result: 'You should be authenticated to access this endpoint [reviews]',
        })
        return
    }
    // if is authenticated OK...
    await connectMongo()

    if (req.method === 'POST') {
        const { spotID, review } = req.body
        try {
            const reviewObject = {
                rate: review.rate,
                comment: review.comment,
                reviewAuthor: session.userID,
                reviewedSpot: spotID,
            }

            const newReview = await Review.create(reviewObject)

            const spotToAddReview = await Spot.findByIdAndUpdate(
                spotID,
                { $addToSet: { reviews: newReview.id } },
                { runValidators: true, new: true },
            )

            res.status(200).json({ success: true, result: newReview })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                result: `There has been an error adding your review: ${error.message}`,
            })
        }
    } else if (req.method === 'PATCH') {
        const { reviews: reviewIDToEdit } = req.query
        const reviewAndRate = req.body

        try {
            const editReview = await Review.findByIdAndUpdate(
                reviewIDToEdit,
                reviewAndRate,
                {
                    runValidators: true,
                    new: true,
                },
            )
            console.log('editReview', editReview)

            res.status(200).json({ success: true, result: editReview })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                result: `There has been an error editing your review: ${error.message}`,
            })
        }
    } else if (req.method === 'DELETE') {
        const { reviews: reviewIDToDelete } = req.query

        try {
            const deleteRev = await Review.findByIdAndDelete(reviewIDToDelete)
            res.status(200).json({ success: true, result: deleteRev })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                result: `There has been an error deleting your review: ${error.message}`,
            })
        }
    } else {
        res.status(401).json({
            success: false,
            result: 'You are authenticated but you should not try to access this endpoint this way [Reviews]...',
        })
    }
}
