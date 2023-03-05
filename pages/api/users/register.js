import User from '../../../models/user'
import { hash } from 'bcryptjs'

import sendVerifEmail from '../../../utils/Mailers/sendVerifEmail'
import createToken from '../../../utils/JWTMailToken/helpers/createToken'

import checkEmailExist from '../../../utils/Auth/checkEmailExist'

export default async function newUser(req, res) {
    if (req.method === 'POST') {
        console.log('bodypayloadfrom API ROUTE', req.body)
        const { email } = req.body

        if (!(await checkEmailExist(email))) {
            // if user does not exist, create it
            console.log('THE USER WITH EMAIL', email, 'DOES NOT EXIST YET')

            //Hash password
            const hashedPassword = await hash(req.body.password, 12)
            const finalUserData = {
                ...req.body,
                password: hashedPassword,
                provider: 'credentials',
            }
            console.log('finalUserData', finalUserData)

            const newUser = await User.create(finalUserData)
            console.log('CREATED USER -->', newUser)

            // Helper fx that creates tokens
            const token = await createToken(newUser._id, newUser.email, '1d')
            if (!token.success) {
                res.status(400).json({ success: token.success, result: token.result })
                console.log('error', token.result)

                return // stop fx execution if failure (will not send email)
            } else {
                console.log('Token creation success', token.result)
            }

            // Fx that sends email
            const sender = await sendVerifEmail(
                'zachariedupain@hotmail.fr',
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
    } else {
        res.status(401).send(
            'You should not try to access this endpoint this way... [create New User]',
        )
    }
}
