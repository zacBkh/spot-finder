import { NAVBAR_ITEMS } from '../../../constants/URLs'

import NavItems from './nav-items'

const HamburgerMenu = ({ isOpen }) => {
    return (
        <nav
            className={`
                    ${isOpen ? 'flex' : 'hidden'}
                    md:hidden
                    absolute flex-col items-center py-8 mt-10 space-y-6 font-bold bg-slate-400  self-end
                    sm:w-auto sm:self-center left-6 right-6 drop-shadow-md`}
        >
            <ul className="flex gap-x-6">
                {NAVBAR_ITEMS.map(item => (
                    <NavItems key={item.link} name={item.name} link={item.link} />
                ))}
            </ul>
        </nav>
    )
}

export default HamburgerMenu
