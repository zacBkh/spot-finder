import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

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
            <header className="mx-auto px-7 py-2 text-dark-color sticky top-0 z-[999] border-b-[1.6px] border-[#dadada] transparent-navbar ">
                <div className="flex items-center justify-between">
                    <div className="cursor-pointer h-[56px]">
                        <Link href={HOME}>
                            <a>
                                <Image
                                    width={121}
                                    height={56}
                                    src={Logo}
                                    alt="Spot Finder logo"
                                />
                            </a>
                        </Link>
                    </div>
                    <nav className="hidden md:block text-sm">
                        <ul className="flex gap-x-3 md:gap-x-6">
                            {NAVBAR_ITEMS.map(item => (
                                <NavItems
                                    key={item.link}
                                    name={item.name}
                                    link={item.link}
                                />
                            ))}
                        </ul>
                    </nav>

                    <div className="flex justify-between items-center gap-x-3 lg:gap-x-6">
                        <SearchSpotBar
                            disabled={router.pathname === HOME ? false : true}
                        />

                        {status === 'authenticated' ? (
                            <UserHeader
                                currentQuery={router.query}
                                currentUser={session}
                            />
                        ) : (
                            ''
                        )}

                        <div ref={refOutside} className="cursor-pointer">
                            <UserAvatar
                                onUserMenuClick={clickUserMenuHandler}
                                currentSession={session ?? null}
                                isOpen={isUserMenuOpen}
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
