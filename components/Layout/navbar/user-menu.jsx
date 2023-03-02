import Link from 'next/link'

import { NAVBAR_VISITOR_ITEMS, NAVBAR_USER_ITEMS } from '../../../constants/URLs'

import NavItems from './nav-items'

const UserMenu = ({ currentAuthStatus, isOpen, onUserMenuClick }) => {
    const whichUserMenu =
        currentAuthStatus === 'authenticated' ? NAVBAR_USER_ITEMS : NAVBAR_VISITOR_ITEMS

    return (
        <div className="relative">
            <div className={`${isOpen ? 'block' : 'hidden'} z-50 absolute right-0`}>
                <nav
                    className={`
                    min-w-[160px]
                    
                    mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100
                    dropdown-shadow`}
                >
                    <ul className="flex flex-col gap-x-6">
                        {whichUserMenu.map(item => (
                            <NavItems
                                onUserMenuClick={onUserMenuClick}
                                key={item.link}
                                context="userMenu"
                                name={item.name}
                                link={item.link}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default UserMenu
