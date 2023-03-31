import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import { getUserData } from '../../services/mongo-fetchers'

import UserCard from '../../components/user-profile/user-card'

const MyProfileNew = () => {
    const { data: session, status } = useSession()

    const fetcherUser = async () => {
        const user = await getUserData(session.userID)
        return user
    }

    const {
        data: user,
        error: userError,
        isLoading: isLoadingUser,
    } = useSWR(session ? 'get_user_profile' : null, fetcherUser)

    if (status !== 'authenticated') return <div>Access denied</div>

    if (isLoadingUser) return <div>Loading...</div>

    if (userError) return <div>failed to load</div>

    const { createdAt, spotsOwned } = user.result
    const joiningDate = new Date(createdAt).getFullYear()

    return (
        <>
            <UserCard joiningDate={joiningDate} userSpots={spotsOwned} />
        </>
    )
}

export default MyProfileNew
