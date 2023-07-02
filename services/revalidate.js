import { PATHS } from '../constants/URLs'

const revalidateOnDemand = async pathToRevalidate => {
    const secret = process.env.REVALIDATION_ROUTE_TOKEN
    const baseURL = PATHS.DOMAIN_WITHOUT_SLASH

    const revalidation = await fetch(
        `${baseURL}/api/revalidate?secret=${secret}&pathToRevalidate=${pathToRevalidate}`,
    )
    const result = await revalidation.json()
    return result
}

export default revalidateOnDemand
