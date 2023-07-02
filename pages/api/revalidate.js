const RevalidationOnDemand = async (req, res) => {
    const { secret, pathToRevalidate } = req.query

    // Check for token
    if (secret !== process.env.REVALIDATION_ROUTE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        await res.revalidate(pathToRevalidate)
        return res.status(200).json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}

export default RevalidationOnDemand
