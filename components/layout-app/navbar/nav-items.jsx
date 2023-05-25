import Link from 'next/link'

const NavItems = ({ name, link, onUserMenuClick, currentPath }) => {
    return (
        <li
            onClick={onUserMenuClick}
            className={` hoverUnderline ${currentPath === link ? 'isActiveNavLink' : ''}`}
        >
            <Link href={link}>{name}</Link>
        </li>
    )
}

export default NavItems
