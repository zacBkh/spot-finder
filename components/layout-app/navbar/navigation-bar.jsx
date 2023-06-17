import { useState, useRef, useEffect } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { PATHS, NAVBAR_ITEMS } from '../../../constants/URLs'

import SearchSpotBar from './search-spot-bar'

import UserHeader from './user-greet-header'
import NavItems from './nav-items'
import HamburgerIcon from './hamburger-icon'
import HamburgerMenu from './hamburger-menu'

import UserAvatar from './user-profile-pic'
import UserMenu from './user-menu'

import Logo from '../../../public/logos/logo-no-background.png'

import useOnClickOutside from '../../../hooks/useOnClickOutside'

const { HOME } = PATHS

const Navigation = ({ userSession }) => {
    // Check for scroll
    const [isScrolled, setisScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 0 ? setisScrolled(true) : setisScrolled(false)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const router = useRouter()
    const { pathname, query } = router

    const { data: session, status } = userSession

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

    // Disable scrolling when hamburger menu opened
    useEffect(() => {
        if (isHamburgerOpen) {
            document.body.style.overflow = 'hidden'
        }

        return () => (document.body.style.overflow = 'auto')
    }, [isHamburgerOpen])

    const DynamicHamburgerMenu = dynamic(
        () =>
            import(
                /* webpackChunkName: 'lazy-loaded-dynamic-hambuerger-menu' */
                './hamburger-menu'
            ),
        {
            ssr: false,
            loading: () => <p>Hamburger menu loading...</p>,
        },
    )

    return (
        <>
            <div
                onClick={() => setIsHamburgerOpen(false)}
                className={` ${
                    isHamburgerOpen ? 'overlayDarkener' : 'bg-transparent'
                } transition-all duration-400 ease-out md:hidden`}
            ></div>

            <header
                className={`mx-auto text-dark-color sticky top-0 z-[999] 
                ${!isHamburgerOpen ? 'transparent-navbar' : 'bg-white'}  
                ${isScrolled ? 'border-[#dadada] border-b-[1.6px]' : ''}`}
            >
                <div className="flex items-center justify-between px-7 py-1 sm:py-2">
                    <Link href={HOME}>
                        <a className="w-24 flex">
                            <Image className="!w-fit" src={Logo} alt="Spot Finder logo" />
                        </a>
                    </Link>
                    <nav className="hidden md:block text-sm">
                        <ul className="flex gap-x-6">
                            {NAVBAR_ITEMS.map(item => (
                                <NavItems
                                    currentPath={pathname}
                                    key={item.link}
                                    details={item}
                                />
                            ))}
                        </ul>
                    </nav>

                    <div className="flex justify-between items-center gap-x-3 lg:gap-x-6">
                        <SearchSpotBar disabled={pathname === HOME ? false : true} />

                        {status === 'authenticated' ? (
                            <UserHeader currentQuery={query} currentUser={session} />
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

                {isHamburgerOpen && (
                    <DynamicHamburgerMenu
                        isOpen={isHamburgerOpen}
                        onHambMenuClick={() => setIsHamburgerOpen(false)}
                        currentPath={pathname}
                    />
                )}
            </header>
        </>
    )
}

export default Navigation
