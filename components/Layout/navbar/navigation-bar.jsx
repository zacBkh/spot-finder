import { useRouter } from 'next/router'
import Image from 'next/image'
import SearchSpotBar from './search-spot-bar'
import { useSession } from 'next-auth/react'

import { useState, useRef } from 'react'

import { PATHS, NAVBAR_ITEMS } from '../../../constants/URLs'

import UserHeader from './user-greet-header'
import NavItems from './nav-items'
import HamburgerIcon from './hamburger-icon'
import HamburgerMenu from './hamburger-menu'

import UserAvatar from './user-profile-pic'
import UserMenu from './user-menu'

import Logo from '../../../public/logos/logo-no-background.png'

import useOnClickOutside from '../../../hooks/useOnClickOutside'

const { HOME } = PATHS

const Navigation = () => {
    const router = useRouter()

    const { data: session, status } = useSession()

    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)

    const clickBurgerHandler = () => {
        setIsHamburgerOpen(prev => !prev)
    }

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const clickUserMenuHandler = () => {
        setIsUserMenuOpen(prev => !prev)
    }

    const refOutside = useRef(null)

    useOnClickOutside(refOutside, () => setIsUserMenuOpen(false))

    return (
        <>
            <header className="mx-auto p-2 bg-white text-dark-color sticky top-0 z-[999] border-b-[1.6px] border-[#dadada]">
                <div className="flex items-center justify-between">
                    <div className="relative w-44 h-14">
                        <Image
                            layout="fill"
                            src={Logo}
                            alt="logo"
                            quality={100}
                            objectFit="cover"
                        />
                    </div>
                    <nav className="hidden md:block text-sm">
                        <ul className="flex gap-x-6">
                            {NAVBAR_ITEMS.map(item => (
                                <NavItems
                                    key={item.link}
                                    name={item.name}
                                    link={item.link}
                                />
                            ))}
                        </ul>
                    </nav>

                    <div className="flex justify-between items-center gap-x-6">
                        <SearchSpotBar
                            disabled={router.pathname === HOME ? false : true}
                        />

                        {status === 'authenticated' ? (
                            <UserHeader
                                currentPath={router.pathname}
                                currentUser={session.user.name}
                            />
                        ) : (
                            ''
                        )}

                        <div ref={refOutside} className="cursor-pointer">
                            <UserAvatar
                                onUserMenuClick={clickUserMenuHandler}
                                currentSession={session ?? null}
                            />
                            <UserMenu
                                onUserMenuClick={clickUserMenuHandler}
                                currentAuthStatus={status}
                                isOpen={isUserMenuOpen}
                            />
                        </div>

                        <HamburgerIcon
                            onHamburgerIconClick={clickBurgerHandler}
                            isOpen={isHamburgerOpen}
                        />
                    </div>
                </div>

                <HamburgerMenu isOpen={isHamburgerOpen} />
            </header>
        </>
    )
}

export default Navigation
