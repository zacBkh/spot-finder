import { Fragment } from 'react'
import Image from 'next/image'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import SearchSpotBar from './navbar/search-spot-bar'
import { useSession, signOut } from 'next-auth/react'

import { BiTargetLock } from 'react-icons/bi'

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'

import { PATHS, NAVBAR_ITEMS } from '../../constants/URLs'

import UserHeader from './navbar/user-greet-header'
import NavItems from './navbar/nav-items'

const { HOME } = PATHS

const Navigation = () => {
    const router = useRouter()

    const { data: session, status } = useSession()

    const navigation = [
        { name: 'Home', href: HOME, current: true },
        { name: 'Add your Spot!', href: '/spots/newSpot', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <header className="mx-auto p-6">
                <div className="flex items-center justify-between">
                    <div className="text-black">LOGO HERE</div>
                    <nav>
                        <ul className="hidden md:flex space-x-6">
                            {NAVBAR_ITEMS.map(item => (
                                <NavItems
                                    key={item.link}
                                    name={item.name}
                                    link={item.link}
                                />
                            ))}
                        </ul>
                    </nav>
                    <div className="flex space-x-6">
                        <div>SEARCH BAR</div>
                        <div>PROFILE SVG</div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navigation
