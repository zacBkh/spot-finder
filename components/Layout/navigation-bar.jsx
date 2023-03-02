import { useRouter } from 'next/router'
import Image from 'next/image'
import SearchSpotBar from './navbar/search-spot-bar'
import { useSession, signOut } from 'next-auth/react'

import { useState } from 'react'

import { PATHS, NAVBAR_ITEMS } from '../../constants/URLs'

import UserHeader from './navbar/user-greet-header'
import NavItems from './navbar/nav-items'
import HamburgerIcon from './navbar/hamburger-icon'
import HamburgerMenu from './navbar/hamburger-menu'

import UserAvatar from './navbar/user-profile-pic'
import UserMenu from './navbar/user-menu'

import DummyLogo from '../../public/images/logo.svg'

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

    return (
        <>
            <header className="mx-auto p-6 bg-slate-800 text-white">
                <div className="flex items-center justify-between ">
                    <Image src={DummyLogo} fill alt="logo" />
                    <nav className="hidden md:block">
                        <ul className="flex gap-x-6">
                            {NAVBAR_ITEMS.map(item => (
                                <NavItems
                                    context="navbar"
                                    key={item.link}
                                    name={item.name}
                                    link={item.link}
                                />
                            ))}
                        </ul>
                    </nav>

                    <div className="flex justify-between items-center gap-x-6">
                        {router.pathname === HOME ? <SearchSpotBar /> : ''}

                        {status === 'authenticated' ? (
                            <UserHeader
                                currentPath={router.pathname}
                                currentUser={session.user.name}
                            />
                        ) : (
                            ''
                        )}

                        <div className="cursor-pointer">
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
