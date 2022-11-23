

import sendWelcomeEmail from '../../../utils/Mailers/sendWelcomeEmail';

// Send welcome email


export default async function sendWlcEmail(req, res) {

    if (req.method === 'POST') {

        const name = req.body;

        const sender = await sendWelcomeEmail("zachariedupain@hotmail.fr", name)
        if (!sender.success) {
            res.status(400).json({ success: sender.success, result: sender.result });
        } else {
            res.status(200).json({ success: sender.success, result: sender.result });
        }



    } else {
        res.status(401).send('You should not try to access this endpoint this way... [send-welcome-email]')
    }
}

