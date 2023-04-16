import connectMongo from '../../utils/connectMongo'
import Review from '../../models/reviews'
import Spot from '../../models/spot'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function APIHandler(req, res) {
    console.log('req.body from add review', req.body)

    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)
    console.log('sesssss', session)
    // If not authenticated
    if (!session) {
        res.status(401).json({
            success: false,
            result: 'You should be authenticated to access this endpoint [add a Review]',
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
        console.log('req.body', req.body)
        const { reviewIDToEdit, review } = req.body
        try {
            const editedReviewObject = {
                rate: review.rate,
                comment: review.comment,
            }

            const editReview = await Review.findByIdAndUpdate(
                reviewIDToEdit,
                editedReviewObject,
                { runValidators: true, new: true },
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
    } else {
        res.status(401).json({
            success: false,
            result: 'You are authenticated but you should not try to access this endpoint this way [add a Review]...',
        })
    }
}
