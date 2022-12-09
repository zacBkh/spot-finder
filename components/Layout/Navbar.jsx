import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import capitalize from "../../utils/capitalize"
import Link from "next/link"
import { useRouter } from 'next/router';

import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

import { useSession, signOut } from "next-auth/react"

import { AiOutlineMenu, AiOutlineBell, AiOutlineClose } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';

import PATHS from '../../utils/URLs';
const { home } = PATHS







const Navigation = () => {

    const searchContext = useContext(AppContext)


    const [navbarSearch, setNavbarSearch] = useState("");


    const router = useRouter();

    const { data: session, status } = useSession()


    // console.log('Session from Navbar', session)
    // console.log('Status from Navbar', status)
    console.log(router.pathname)


    const navigation = [
        { name: 'Home', href: home, current: true },
        { name: 'Add your Spot!', href: '/spots/newSpot', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const essaiHandler = async () => {
        await signOut({ redirect: false });
        router.push("/")
    }
    return (
        <>
            {/* Left part of the navbar */}
            <Disclosure as="nav" className="bg-gray-800   fixed w-full z-20 top-0 left-0 ">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="block h-8 w-auto lg:hidden"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                        <img
                                            className="hidden h-8 w-auto lg:block"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>


                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">

                                            {navigation.map((item) => {
                                                if (item !== null) {
                                                    return (
                                                        <Link href={item.href}>
                                                            <a
                                                                className={classNames(
                                                                    router.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                    'px-3 py-2 rounded-md text-sm font-medium list-none	'
                                                                )}
                                                                key={item.href}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        </Link>
                                                    )
                                                }
                                            })}

                                        </div>
                                    </div>
                                </div>







                                {/* Right part of the navbar */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                                    {
                                        status === "authenticated" &&
                                        <Link
                                            href="/auth/profile">
                                            <a className={classNames(
                                                router.pathname === "/auth/profile" ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium list-none')}>

                                                {`Hello, ${capitalize(session.user.name)}`}
                                            </a>
                                        </Link>

                                    }






                                    <div
                                        className="relative hidden md:block mr-12">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>

                                            <span className="sr-only">Search icon</span>
                                        </div>

                                        <input
                                            // onChange={(e) => setNavbarSearch(e.target.value)}
                                            onChange={(e) => searchContext.addSearch(e.target.value)}
                                            value={searchContext.value}
                                            type="text" id="search-navbar" placeholder="Search..."
                                            className="text-white text-sm 	 block w-full p-2 pl-10 rounded-lg bg-gray-700 focus:ring-white focus:border-white border-none" />
                                    </div>







                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">

                                        <span className="sr-only">View notifications</span>
                                        <AiOutlineBell className="h-6 w-6" aria-hidden="true" />
                                    </button>



                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm ">
                                                <span className="sr-only">Open user menu</span>

                                                {session &&
                                                    session.user.image ?
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={session.user.image}
                                                        alt="Profile picture"
                                                    />
                                                    :
                                                    <BiUserCircle
                                                        className='text-3xl text-white'
                                                    />
                                                }

                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >



                                            {/* Replaced Menu.Items with a div so hamburger menu closes on click */}
                                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">



                                                {
                                                    status !== "authenticated" &&
                                                    <>
                                                        <Menu.Item>
                                                            <li
                                                                className={"block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"}>
                                                                <Link
                                                                    href="/auth/Register">
                                                                    <a className='block'> Register </a>
                                                                </Link>
                                                            </li>
                                                        </Menu.Item>


                                                        <Menu.Item>
                                                            <li
                                                                className={"block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"}>
                                                                <Link
                                                                    href="/auth/SignIn">
                                                                    <a className='block'> Login </a>
                                                                </Link>
                                                            </li>
                                                        </Menu.Item>
                                                    </>
                                                }




                                                {
                                                    status === "authenticated" &&
                                                    <>
                                                        <Menu.Item>
                                                            <Link
                                                                href="/auth/profile">
                                                                <a
                                                                    className={"block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"}> My Profile
                                                                </a>
                                                            </Link>

                                                        </Menu.Item>


                                                        <Menu.Item>
                                                            <Link
                                                                href="/auth/profile">
                                                                <a
                                                                    className={"block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"}> Settings
                                                                </a>
                                                            </Link>
                                                        </Menu.Item>


                                                        <Menu.Item>

                                                            <Link
                                                                href="/auth/profile">
                                                                <a
                                                                    className={"block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"}
                                                                    onClick={async () => {
                                                                        // await signOut({ redirect: false });
                                                                        await signOut();
                                                                        // Removed the avoid reload because causing error when signing out from show page
                                                                        router.push(home);
                                                                    }}> Sign out
                                                                </a>
                                                            </Link>

                                                        </Menu.Item>
                                                    </>
                                                }
                                            </div>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>



                        {/* Hamburger menu */}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => {
                                    if (item !== null) {
                                        return (
                                            <Disclosure.Button
                                                onClick={item.onClick ? item.onClick : null}
                                                key={item.href}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        )
                                    }
                                })}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}

export default Navigation 