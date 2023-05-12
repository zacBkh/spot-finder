import Link from 'next/link'

const NavItems = ({ name, link, onUserMenuClick }) => {
    return (
        <li onClick={onUserMenuClick} className="hover:text-primary">
            <Link href={link}>{name}</Link>
        </li>
    )
}

export default NavItems
