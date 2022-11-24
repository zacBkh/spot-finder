import connectMongo from "../../../utils/connectMongo"
import User from "../../../models/user"

// Function return values
// TRUE : EMAIL DOES NOT EXIST YET IN DB
// FALSE : EMAIL ALREADY EXIST! 

export default async function emailChecker(req, res) {
    if (req.method === 'POST') {

        try {

            await connectMongo()
            console.log("Checking if", req.body, "exist on the DB...")

            const queryDB = await User.findOne({ email: req.body })
            console.log("QUERY DB FROM", queryDB)


            queryDB === null
                ? res.json({ success: true, result: true })
                : res.json({ success: true, result: false })

                
        } catch (error) {
            return { success: false, result: `There has been an error in the email asynchronous validation: ${error.message}` }
        }

    } else {
        res.status(401).send('You should not try to access this endpoint this way... [verify-email-async]')
    }
}




