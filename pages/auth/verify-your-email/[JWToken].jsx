import { useRouter } from 'next/router'

import useSWR from 'swr'

import { verifyJWT } from '../../../services/mongo-fetchers'
import SWR_KEYS from '../../../constants/SWR-keys'

import VerifyJWTDisplay from '../../../components/auth/verify-jwt-displayer'

const VerifyEmail = ({}) => {
    const router = useRouter()
    const { isReady, query } = router
    const { JWToken } = query

    const fetcher = async () => {
        const resultJWTCheck = await verifyJWT(JWToken)
        return resultJWTCheck
    }

    const { data, error, isLoading } = useSWR(
        !isReady ? null : SWR_KEYS.VERIFY_USER_EMAIL_JWT,
        fetcher,
    )

    return <VerifyJWTDisplay error={error} data={data} isLoading={isLoading} />
}

export default VerifyEmail
