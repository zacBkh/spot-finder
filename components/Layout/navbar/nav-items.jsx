import Link from 'next/link'

const NavItems = ({ name, link }) => {
    return (
        <li key={link}>
            <Link href={link}>{name}</Link>
        </li>
    )
}

export default NavItems
