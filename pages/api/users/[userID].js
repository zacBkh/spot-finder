import connectMongo from '../../../utils/connectMongo'

import User from '../../../models/user'
import Spot from '../../../models/spot'
import Reviews from '../../../models/reviews'

import { hash } from 'bcryptjs'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

// Edit some user data including pwd
// Receive payload (req.body = new userDATA) and userID in URL (req.query)
export default async function userHandling(req, res) {
    console.log('aaa')
    await connectMongo()

    const { userID } = req.query

    // Used lean to convert mongo doc to JS object
    const user = await User.findById(userID)
        .populate({
            path: 'spotsOwned',
            // Get reviews of every spotsOwned - populate the 'reviews' field for every spotsOwned but with only rate - deep population
            populate: { path: 'reviews', select: 'rate' },
        })
        .lean()

    // If does not find user
    if (!user) {
        res.status(400).json({ success: false, result: 'User does not exist' })
        return
    }

    // Look for Spots which contains the userID in their visitors field
    const visitedSpotsOfUser = await Spot.find({ visitors: userID })
        .populate('reviews', 'rate') // populate only rate from reviews
        .lean()

    // Look for Reviews which contains the userID in their reviewAuthor field
    const reviewsOfUser = await Reviews.find({ reviewAuthor: userID })
        .select('reviewedSpot')
        .lean()

    const reviewedSpotsOfUserList = reviewsOfUser.map(review => review.reviewedSpot) // array of spot ids reviewed by this user

    // Search all the spots whoose id is included in reviewedSpotsOfUserList
    const spotsUserReviewed = await Spot.find({
        _id: { $in: reviewedSpotsOfUserList },
    })
        .populate('reviews', 'rate') // populate only rate from reviews
        .lean()

    // Adding spots visited & reviewed to user object
    const userWithSpotsVisited = {
        ...user,
        visitedSpots: visitedSpotsOfUser,

        // reviewsUserLet: reviewsOfUser,
        spotsUserReviewed: spotsUserReviewed,
    }

    if (req.method === 'GET') {
        res.status(200).json({
            success: true,
            result: userWithSpotsVisited,
        })
        return
    }
    if (req.method === 'PATCH') {
        try {
            //Hash password
            const hashedPassword = await hash(req.body, 12)
            console.log('hashedPassword', hashedPassword)

            const userEdition = await User.findByIdAndUpdate(
                userID,
                { password: hashedPassword },
                { runValidators: true, new: true },
            )

            console.log('USER TO EDIT -->', userEdition)

            res.status(200).json({ success: true, result: userEdition })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                result: `There has been an arror changing your password: ${error} `,
            })
        }
    } else if (req.method === 'DELETE') {
        // Protecting the API endpoint
        const session = await unstable_getServerSession(req, res, authOptions)

        try {
            if (!session) {
                // If not authenticated
                res.status(401).json({
                    success: false,
                    result: 'You should be authenticated to access this endpoint [delete User]',
                })
                return
            }

            if (session.userID !== userID) {
                res.status(401).json({
                    success: false,
                    result: 'You cannot delete the account of another user [delete User]',
                })
                return
            }

            // Delete user
            // Mongoose middleware also delete corresponding documents + visited marks
            await User.findByIdAndDelete(userID)

            // HERE I NEED TO REMOVE ALL THE REVIEWS HE CREATED FROM REVIEW ARRAY OF SPOT MODEL
            // // Removing the reference of the Review in the reviews array of the CG model
            // await CampGrounds.findByIdAndUpdate(campId, //Finding the CG
            //     { $pull: { reviews: reviewId } } // Will pull out anything with reviewId as an ID from [reviews] array
            // )
            // //As a reminder => reviews is just an array of ID's even if in Mongo it populates it for us

            res.status(200).json({ success: true, result: 'The user has been deleted' })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                result: `There has been an arror deleting the user: ${error.message}`,
            })
        }
    } else {
        res.status(401).json({
            success: false,
            result: 'You are authorized but you should not try to access this endpoint this way [edit/delete existing User]...',
        })
    }
}
