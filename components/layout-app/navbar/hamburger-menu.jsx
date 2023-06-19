import { NAVBAR_ITEMS } from '../../../constants/URLs'

import NavItems from './nav-items'

const HamburgerMenu = ({ isOpen, currentPath, onHambMenuClick }) => {
    return (
        <nav
            className={`
            absolute
            w-full
            transition-hamburger-menu 
            ${isOpen ? 'opacity-100 ' : 'opacity-0 invisible'}
            md:hidden
            
            py-8 bg-white text-form-color
             drop-shadow-2xl`}
        >
            <ul className="flex flex-col gap-y-4 px-5">
                {NAVBAR_ITEMS.map(item => (
                    <NavItems
                        hamburgerMenu
                        onHambMenuClick={onHambMenuClick}
                        key={item.link}
                        currentPath={currentPath}
                        details={item}
                    />
                ))}
            </ul>
        </nav>
    )
}

export default HamburgerMenu

const printCars = nbOfCarsOwned => {
    console.log(`I own ${nbOfCarsOwned ?? 1} car(s)!`)
}
