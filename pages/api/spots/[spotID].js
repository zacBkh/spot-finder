import connectMongo from '../../../utils/connectMongo'
import Spot from '../../../models/spot'
import User from '../../../models/user'

import isAuthor from '../../../utils/Auth/isAuthor'

import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function APIHandler(req, res) {
    const { spotID } = req.query

    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        // If not authenticated
        res.status(401).json({
            success: false,
            result: 'You should be authenticated to access this endpoint [amend existing Spot]',
        })
        return
    } else if (!(await isAuthor(spotID, session.userID))) {
        // if not author
        res.status(401).json({
            success: false,
            result: 'You are not the owner of the spot [amend existing Spot]',
        })
        return
    } else {
        await connectMongo()

        if (req.method === 'PATCH') {
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
