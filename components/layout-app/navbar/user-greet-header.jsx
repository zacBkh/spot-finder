import Link from 'next/link'

import capitalize from '../../../utils/capitalize'
import { PATHS } from '../../../constants/URLs'

const UserHeader = ({ currentQuery, currentUser }) => {
    const { user, userID } = currentUser

    const { PROFILE } = PATHS

    const userProfile = `${PROFILE}/${userID}`

    const isUserVisitedHisOwnProfile = currentQuery.userID === userID

    return (
        <Link href={userProfile}>
            <a
                className={`hidden sm:block px-3 py-2 rounded-md text-sm font-medium list-none
        ${
            isUserVisitedHisOwnProfile
                ? 'bg-primary text-white'
                : 'text-dark-color hover:bg-primary hover:text-white'
        }`}
            >
                {`Hello, ${capitalize(user.name)}`}
            </a>
        </Link>
    )
}

export default UserHeader
