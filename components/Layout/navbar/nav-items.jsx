import Link from 'next/link'

import { signOut } from 'next-auth/react'

// context === "navbar" OR "hamburgerMenu" OR "userMenu"
const NavItems = ({ name, link, context, onUserMenuClick }) => {
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
                    <a onClick={() => signOut()}>{name}</a>
                ) : (
                    <Link href={link}>{name}</Link>
                )}
            </li>
        )
}

export default NavItems
