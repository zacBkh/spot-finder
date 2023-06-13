// import { useState } from 'react'

// import JWTVerifyer from '../../../utils/jwt-mail-tokens/verify-jwt'
import { useRouter } from 'next/router'

import useSWR from 'swr'

import { verifyJWT } from '../../../services/mongo-fetchers'
import SWR_KEYS from '../../../constants/SWR-keys'

import VerifyJWTDisplay from '../../../components/auth/verify-jwt-displayer'
// Get Server Side Props
// export const getServerSideProps = async context => {
//     const { JWToken } = context.params
//     const emailVerifResult = await JWTVerifyer(JWToken)
//     console.log('emailVerifResult', emailVerifResult)

//     return {
//         props: {
//             emailVerifResult: JSON.parse(JSON.stringify(emailVerifResult)),
//         },
//     }
// }

const VerifyEmail = ({}) => {
    console.log('component rended')

    const router = useRouter()
    const { isReady, query } = router
    const { JWToken } = query

    const fetcher = async () => {
        const resultJWTCheck = await verifyJWT(JWToken)
        console.log('resultJWTCheck', resultJWTCheck)
        return resultJWTCheck.result
    }

    const { data, error, isLoading } = useSWR(
        !isReady ? null : SWR_KEYS.VERIFY_USER_EMAIL_JWT,
        fetcher,
    )
    console.log('error', error)
    console.log('data', data)
    console.log('isLoading', isLoading)

    // Display current status
    // const [status, setStatus] = useState(emailVerifResult.result)
    // console.log('status', status)

    // if (error) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>
    // return <div>aaa</div>

    // return <h1>Helfek</h1>
    return (
        <>
            {/* <h1>Hi</h1> */}
            <VerifyJWTDisplay error={error} data={data} isLoading={isLoading} />
        </>
    )
}

export default VerifyEmail
