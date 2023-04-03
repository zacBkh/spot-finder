import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import { getUserData } from '../../services/mongo-fetchers'

import UserCard from '../../components/user-profile/user-card'

import SkeletonText from '../../components/skeletons/text-skeleton'
import SkeletonImage from '../../components/skeletons/image-skeleton'
import SkeletonUserCard from '../../components/skeletons/parents/user-card-skeleton'

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

    const sessionOrUserNotReady = status === 'loading' || isLoadingUser
    if (status === 'unauthenticated') return <div>Access denied</div>

    if (userError) return <div>failed to load</div>

    const joiningDate = new Date(user ? user.result.createdAt : '').getFullYear()
    return (
        <>
            <UserCard
                isLoading={sessionOrUserNotReady}
                joiningDate={sessionOrUserNotReady ? '' : joiningDate}
                userSpots={sessionOrUserNotReady ? '' : user.result.spotsOwned}
            />
        </>
    )
}

export default MyProfileNew
