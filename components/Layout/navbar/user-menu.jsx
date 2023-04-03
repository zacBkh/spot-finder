import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

import { PATHS } from '../../../constants/URLs'
import { TOAST_PARAMS } from '../../../constants/toast-query-params'
const { KEY, VALUE_LOGOUT } = TOAST_PARAMS

import DividerDesign from '../../design/divider'

const UserMenu = ({ currentAuthStatus, isOpen, onUserMenuClick }) => {
    const { data: session } = useSession()
    const userID = session?.userID

    const callbackURLWithToast = `${PATHS.HOME}?${KEY}=${VALUE_LOGOUT}`

    return (
        <div className="relative">
            <div className={`${isOpen ? 'block' : 'hidden'} z-50 absolute right-0`}>
                <nav
                    className={`min-w-[140px]
                        text-form-color
                        mt-2 w-max rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100
                        menuStyle
                        shadowPF
                        `}
                >
                    <ul className="flex flex-col gap-x-6">
                        {currentAuthStatus === 'authenticated' ? (
                            <>
                                <li onClick={onUserMenuClick}>
                                    <Link href={`${PATHS.PROFILE}/${userID}`}>
                                        My Profile
                                    </Link>
                                </li>
                                <DividerDesign />

                                <li
                                    onClick={() =>
                                        signOut({ callbackUrl: callbackURLWithToast })
                                    }
                                >
                                    <a>Sign Out</a>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href={PATHS.AUTH}>Sign up or Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default UserMenu
