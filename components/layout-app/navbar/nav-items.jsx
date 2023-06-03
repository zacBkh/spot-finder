import Link from 'next/link'

const NavItems = ({ details, onHambMenuClick, currentPath, hamburgerMenu }) => {
    const { name, link } = details

    return (
        <li
            onClick={onHambMenuClick}
            className={`hoverUnderline font-base flex md:block items-center gap-x-3 w-fit
            ${currentPath === link ? 'isActiveNavLink' : ''}
            ${hamburgerMenu ? 'hover:underline underline-offset-2' : ''}
           `}
        >
            {hamburgerMenu ? details.icon : ''}
            <Link href={link}>{name}</Link>
        </li>
    )
}

export default NavItems
