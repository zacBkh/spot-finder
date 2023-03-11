import connectMongo from '../../../utils/connectMongo'
import Spot from '../../../models/spot'
import User from '../../../models/user'

// End point protection
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

// When this API route is hitted, execute this
export default async function newSpot(req, res) {
    // Protecting the endpoint
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).send({
            success: false,
            result: 'You should be authenticated to access this endpoint [create New Spot]',
        })
        return
    } else {
        console.log('Session', JSON.stringify(session, null, 2))

        if (req.method === 'POST') {
            try {
                await connectMongo()
                console.log('CONNECTED TO MONGO !')
                console.log('bodypayloadfrom API ROUTE', req.body)

                const newSpot = await Spot.create(req.body)

                console.log('CREATED DOCUMENT -->', newSpot)
                console.log('IDD -->', newSpot._id)

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
        } else {
            res.status(401).send({
                success: false,
                result: 'You are authenticated but you should not try to access this endpoint this way... [create New Spot]',
            })
        }
    }
}
