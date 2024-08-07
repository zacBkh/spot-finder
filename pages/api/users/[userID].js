import connectMongo from '../../../utils/connect-to-mongo'

import User from '../../../models/user'
import Spot from '../../../models/spot'
import Reviews from '../../../models/reviews'

import { hash } from 'bcryptjs'

import sendVerifEmail from '../../../services/emailers-srv/account-verification'
import createToken from '../../../utils/jwt-mail-tokens/helpers/generate-token'
import checkEmailExist from '../../../services/check-if-email-exists'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

import revalidateOnDemand from '../../../services/revalidate'

// Edit some user data including pwd
// Receive payload (req.body = new userDATA) and userID in URL (req.query)
export default async function userHandling(req, res) {
    await connectMongo()
    console.log('req.query', req.query)
    const { userID } = req.query

    if (req.method === 'GET') {
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
            spotsUserReviewed: spotsUserReviewed,
        }

        res.status(200).json({
            success: true,
            result: userWithSpotsVisited,
        })
        return
    }

    if (req.method === 'POST') {
        const { email } = req.body

        if (!(await checkEmailExist(email))) {
            // if user does not exist, create it

            //Hash password
            const hashedPassword = await hash(req.body.password, 10)
            const finalUserData = {
                ...req.body,
                password: hashedPassword,
                provider: 'credentials',
            }

            const newUser = await User.create(finalUserData)

            // Helper fx that creates tokens
            const token = await createToken(newUser._id, newUser.email, '1d')
            if (!token.success) {
                res.status(400).json({ success: token.success, result: token.result })
                console.log('error from token generation', token.result)

                return // stop fx execution if failure (will not send email)
            } else {
                console.log('Token creation success', token.result)
            }

            // Fx that sends email
            const sender = await sendVerifEmail(
                newUser.email,
                finalUserData,
                token.result,
            )
            if (!sender.success) {
                res.status(400).json({ success: sender.success, result: sender.result })
            } else {
                res.status(200).json({ success: sender.success, result: sender.result })
            }
        } else {
            res.status(422).json({ success: false, result: 'User already exists.' })
        }
        return
    }

    // DONT FORGET TO PROTECT USER EDIT MUST BE LOGGED IN
    if (req.method === 'PATCH') {
        console.log('req.body', req.body)
        const { isPwdReset } = req.body

        // If request related to pwd change
        if (JSON.parse(isPwdReset)) {
            const { newUserData: newPwd } = req.body

            try {
                //Hash password
                const hashedPassword = await hash(newPwd, 10)
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
                    result: `There has been an error changing your password: ${error} `,
                })
            }
            return
        } else {
            // not a pwd reset request, but user details change...
            const session = await unstable_getServerSession(req, res, authOptions)

            try {
                if (!session) {
                    // If not authenticated
                    res.status(401).json({
                        success: false,
                        result: 'You should be authenticated to access this endpoint [edit User description]',
                    })
                    return
                }

                const { newUserData } = req.body

                const userEdition = await User.findByIdAndUpdate(
                    userID,
                    { description: newUserData },
                    {
                        runValidators: true,
                        new: true,
                    },
                )

                res.status(200).json({ success: true, result: userEdition })
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    success: false,
                    result: `There has been an error updating your profile: ${error} `,
                })
            }
            return
        }
    }

    if (req.method === 'DELETE') {
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

            await User.findByIdAndDelete(userID)
            res.status(200).json({ success: true, result: 'The user has been deleted' })
            const revalidateIndexPage = await revalidateOnDemand('/')
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
