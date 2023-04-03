import Link from 'next/link'

const NavItems = ({ name, link, onUserMenuClick }) => {
    return (
        <li onClick={onUserMenuClick}>
            <Link href={link}>{name}</Link>
        </li>
    )
}

export default NavItems
