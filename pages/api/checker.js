import connectMongo from "../../utils/connectMongo"
import User from "../../models/user"


// This fx will RETURN TRUE IF EMAIL DOES NOT EXIST IN DB

export default async function emailChecker(req, res) {
    if (req.method === 'POST') {
        await connectMongo()
        console.log("Checking if", req.body, "exist on the DB...")

        const queryDB = await User.findOne({ email: req.body })
        console.log("QUERY DB FROM", queryDB)
        queryDB === null ? res.json(true) : res.json(false)

    } else {
        res.status(401).send('You should not try to access this endpoint this way... [verify-email]')
    }
}




