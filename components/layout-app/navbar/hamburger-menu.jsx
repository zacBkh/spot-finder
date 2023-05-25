import { NAVBAR_ITEMS } from '../../../constants/URLs'

import NavItems from './nav-items'

const HamburgerMenu = ({ isOpen }) => {
    return (
        <nav
            className={`
             ${isOpen ? 'opacity-100 ' : 'opacity-0 invisible'}
            absolute md:hidden transition-opacity
            mt-2
            rounded-md border-2 border-white
            py-8 font-bold bg-secondary text-white
            sm:w-auto left-6 right-6 drop-shadow-2xl`}
        >
            <ul className="flex flex-col gap-y-4 items-center">
                {NAVBAR_ITEMS.map(item => (
                    <NavItems key={item.link} name={item.name} link={item.link} />
                ))}
            </ul>
        </nav>
    )
}

export default HamburgerMenu
