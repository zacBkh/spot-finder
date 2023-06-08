import checkEmailExist from '../../../services/check-if-email-exists'
import createToken from '../../../utils/jwt-mail-tokens/helpers/generate-token'
import sendPwdResetEmail from '../../../services/emailers-srv/pwd-reset'
import { whichDomain } from '../../../utils/env-helper'

export default async function resetPwdLink(req, res) {
    const currDomain = whichDomain()
    console.log('currDomain', currDomain)

    if (req.method === 'POST') {
        const email = req.body
        const doesUserExist = await checkEmailExist(email.toLowerCase())
        if (!doesUserExist) {
            res.status(200).json({
                success: false,
                result: 'This email cannot be matched with any of the exisitng accounts.',
            })
            return
        }

        const { id, name } = doesUserExist

        // Helper fx that creates tokens
        const token = await createToken(id, email, '1d')
        if (!token.success) {
            res.status(400).json({ success: token.success, result: token.result })
            return
        }
        console.log('token', token.result)

        // Fx that sends email
        const sender = await sendPwdResetEmail(
            'zachariedupain@hotmail.fr',
            name,
            token.result,
        )
        console.log('sender', sender)
        if (!sender.success) {
            res.status(400).json({ success: sender.success, result: sender.result })
        } else {
            res.status(200).json({ success: sender.success, result: sender.result })
        }
    } else {
        res.status(401).send(
            'You should not try to access this endpoint this way... [send password reset token]',
        )
    }
}
