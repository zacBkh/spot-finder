import Link from 'next/link'

import capitalize from '../../../utils/capitalize'
import { PATHS } from '../../../constants/URLs'

const UserHeader = ({ currentPath, currentUser }) => {
    const { PROFILE } = PATHS
    return (
        <Link href={PROFILE}>
            <a
                className={`px-3 py-2 rounded-md text-sm font-medium list-none
        ${
            currentPath === PROFILE
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
            >
                {`Hello, ${capitalize(currentUser)}`}
            </a>
        </Link>
    )
}

export default UserHeader
