import connectMongo from '../../../utils/connectMongo'
import User from '../../../models/user'

// USE for Async valid in logger

// Function return values
// TRUE : EMAIL DOES NOT EXIST YET IN DB
// FALSE : EMAIL ALREADY EXIST!

export default async function emailChecker(req, res) {
    if (req.method === 'POST') {
        try {
            await connectMongo()
            console.log('Checking if', req.body, 'exist on the DB...')

            const queryDB = await User.findOne({ email: req.body })
            console.log('QUERY DB FROM', queryDB)

            if (queryDB === null) {
                // no exist
                return res.json({ success: true, result: true })
            } else {
                // exist
                return res.json({
                    success: true,
                    result: false,
                    provider: queryDB.provider,
                    email: queryDB.email,
                })
            }
        } catch (error) {
            return {
                success: false,
                result: `There has been an error in the email asynchronous validation: ${error.message}`,
            }
        }
    } else {
        res.status(401).send(
            'You should not try to access this endpoint this way... [verify-email-async]',
        )
    }
}
