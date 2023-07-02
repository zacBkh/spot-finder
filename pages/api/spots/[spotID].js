import connectMongo from '../../../utils/connect-to-mongo'
import Spot from '../../../models/spot'
import User from '../../../models/user'

import isAuthor from '../../../services/is-user-spot-owner'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

import revalidateOnDemand from '../../../services/revalidate'

export default async function APIHandler(req, res) {
    const { spotID } = req.query

    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)

    // If a get request
    if (req.method === 'GET') {
        await connectMongo()

        try {
            const oneSpot = await Spot.findById(spotID)
                .populate('author', 'name') // Populating ONLY author name
                .populate({
                    path: 'reviews',
                    // Get reviewAuthor of every reviews - populate the 'reviewAuthor' field for every reviews but with only reviewer name - deep population
                    populate: { path: 'reviewAuthor', select: 'name profilePic' },
                })
            console.log('oneSpot', oneSpot)
            res.status(200).json({ success: true, result: oneSpot })
        } catch (error) {
            console.log(error)
            res.status(200).json({ success: false, result: error })
        }

        return
    }

    const revalidateIndexPage = await revalidateOnDemand('/')

    if (!session) {
        // If not authenticated
        res.status(401).json({
            success: false,
            result: 'You should be authenticated to access this endpoint [amend existing Spot]',
        })
        return
    }

    if (req.method === 'POST') {
        try {
            await connectMongo()

            const newSpot = await Spot.create(req.body)

            // Adding in the user model the spot he owns
            const user = await User.findByIdAndUpdate(session.userID, {
                $addToSet: { spotsOwned: newSpot._id },
            })

            res.status(200).json({ success: true, result: newSpot })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                result: `There has been an error creating your new spot`,
            })
        }
        return
    }

    if (!(await isAuthor(spotID, session.userID))) {
        res.status(401).json({
            success: false,
            result: 'You are not the owner of the spot [amend existing Spot]',
        })
        return
    } else {
        await connectMongo()

        if (req.method === 'PATCH') {
            console.log('req.body', req.body)
            try {
                const spotToEdit = await Spot.findByIdAndUpdate(spotID, req.body, {
                    runValidators: true,
                    new: true, //to return the document after update
                })

                res.status(200).json({ success: true, result: spotToEdit })
            } catch (error) {
                console.log(error)
                res.status(200).json({ success: false, result: error })
            }
        } else if (req.method === 'DELETE') {
            try {
                const spotToDelete = await Spot.findByIdAndDelete(spotID)

                // Deleting the spot in the spotsOwned of author
                const user = await User.findByIdAndUpdate(spotToDelete.author, {
                    $pull: { spotsOwned: spotID },
                })

                res.json({ SpotDeleted: spotToDelete })
            } catch (error) {
                console.log(error)
                res.json({ error })
            }
        } else {
            res.status(401).json({
                success: false,
                result: 'You are authenticated but you should not try to access this endpoint this way [amend existing Spot]...',
            })
        }
    }
}
