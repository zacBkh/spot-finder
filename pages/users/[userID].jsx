import CustomErrorPage from '../404'

import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { getUserData } from '../../services/mongo-fetchers'

import UserCard from '../../components/user-profile/user-card'

const UserProfile = () => {
    const router = useRouter()
    const { isReady, query } = router

    const { data: session, status } = useSession()

    const fetcherUser = async () => {
        const userData = await getUserData(query.userID)

        return userData
    }

    const { data: userVisited, error: userError } = useSWR(
        isReady ? 'get_user_profile' : null,
        fetcherUser,
    )

    const sessionNotReady = status === 'loading'

    console.log('userVisited', userVisited)

    if (userVisited?.success === false) {
        return <CustomErrorPage contextErrHelper={userVisited.result} />
    }

    console.log('userVisited', userVisited)
    return (
        <>
            <UserCard
                isLoading={!userVisited}
                visitedUser={!userVisited ? '' : userVisited.result}
                currentUser={sessionNotReady ? '' : session}
            />
        </>
    )
}

export default UserProfile
