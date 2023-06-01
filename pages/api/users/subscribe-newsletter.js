import mailchimp from '@mailchimp/mailchimp_marketing'

export default async function userHandling(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({
            success: false,
            result: 'You should not access the endpoint this way [userSubscriptionNewsletter]',
        })
        return
    }

    if (req.method === 'POST') {
        const email = req.body
        console.log('email---------', email)

        try {
            mailchimp.setConfig({
                apiKey: process.env.MAILCHIMP_API_KEY,
                server: process.env.MAILCHIMP_SERVER_PREFIX,
            })

            const response = await mailchimp.lists.addListMember(
                process.env.MAILCHIMP_AUDIENCE_ID,
                {
                    email_address: email,
                    status: 'pending',
                    tags: ['newsletter'],
                },
            )

            res.status(200).json({
                success: true,
                result: 'Please check your mailbox and junk.',
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                result: `You have already received a confirmation email. Please check your junks.`,
            })
        }
    }
}
