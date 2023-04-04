import Error from 'next/error'

import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { getUserData } from '../../services/mongo-fetchers'

import UserCard from '../../components/user-profile/user-card'

const UserProfile = () => {
    const router = useRouter()
    const { isReady, query } = router

    const { data: session, status } = useSession()

    console.log('session', session)
    console.log('router.query', router.query)

    const fetcherUser = async () => {
        const userData = await getUserData(query.userID)
        console.log('userData', userData)

        return userData
    }

    const { data: userVisited, error: userError } = useSWR(
        isReady ? 'get_user_profile' : null,
        fetcherUser,
    )
    console.log('userVisited', userVisited)

    const sessionNotReady = status === 'loading'
    if (userError) return <div>failed to load</div>

    if (!userVisited?.success) {
        return <Error title={'Error bro'} />
    }
    return (
        <>
            <UserCard
                isLoading={!userVisited}
                visitedUser={!userVisited ? '' : userVisited.result}
                currentUser={sessionNotReady ? '' : session}
            />

            {/* <h1>{emailVerified ? 'true' : 'false'}</h1>
            <h1>Number of spots: {ownedSpots.length}</h1> */}
        </>
    )
}

export default UserProfile
