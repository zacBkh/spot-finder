import Link from 'next/link'

import { signOut } from 'next-auth/react'

import { PATHS } from '../../../constants/URLs'
import { TOAST_PARAMS } from '../../../constants/toast-query-params'

// context === "navbar" OR "hamburgerMenu" OR "userMenu"
const NavItems = ({ name, link, context, onUserMenuClick }) => {
    const callbackURLWithToast = `${PATHS.HOME}${TOAST_PARAMS.LOGOUT}`

    if (context === 'navbar')
        return (
            <li key={link} onClick={onUserMenuClick}>
                <Link href={link}>{name}</Link>
            </li>
        )

    if (context === 'hamburgerMenu')
        return (
            <li key={link} onClick={onUserMenuClick}>
                <Link href={link}>{name}</Link>
            </li>
        )

    if (context === 'userMenu')
        return (
            <li key={link} onClick={onUserMenuClick} className="text-black">
                {name === 'Sign Out' ? (
                    <a onClick={() => signOut({ callbackUrl: callbackURLWithToast })}>
                        {name}
                    </a>
                ) : (
                    <Link href={link}>{name}</Link>
                )}
            </li>
        )
}

export default NavItems
