import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'



import Link from "next/link"
import { useState } from "react";

import { useSession, signOut } from "next-auth/react"

import { AiOutlineMenu, AiOutlineBell, AiOutlineClose } from 'react-icons/ai';



const Navigation = () => {
    const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

    const hamburgerMenuToggler = () => {
        setIsHamburgerOpened((prevState) => !prevState)
    }

    const { data: session, status } = useSession()


    console.log('Session from Navbar', session)
    console.log('Status from Navbar', status)



    const navigation = [
        { name: 'Home', href: '/spots/allSpots', current: true },
        { name: 'Add your Spot!', href: '/spots/newSpot', current: false },

        status !== "authenticated"
            ?
            { name: 'Register', href: '/auth/Register', current: false }
            :
            null

        ,
        status !== "authenticated"
            ?
            { name: 'Login', href: '/auth/SignIn', current: false }
            :
            { name: 'Logout', href: '#', onClick: () => signOut({ redirect: false }), current: false }
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            {/* Left part of the navbar */}
            <Disclosure as="nav" className="bg-gray-800">
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
                                                        <li
                                                            className={classNames(
                                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium list-none	'
                                                            )}
                                                            key={item.name}
                                                            onClick={item.onClick ? item.onClick : null}>
                                                            <Link href={item.href}>{item.name}</Link>

                                                        </li>
                                                    )
                                                }
                                            })}

                                        </div>
                                    </div>
                                </div>







                                {/* Right part of the navbar */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <AiOutlineBell className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
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




                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">



                                                {
                                                    status !== "authenticated" &&
                                                    <>
                                                        {/*                                                         <div className='hover:bg-gray-100'>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        href="/auth/SignIn"> 
                                                                        <a
                                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 list-none')}>Login
                                                                        </a>
                                                                    </Link>

                                                                )}
                                                            </Menu.Item>
                                                        </div> */}

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


                                                        {/*                                                <Menu.Item>
                                                            {({ active }) => (
                                                                <li
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 list-none')}>
                                                                    <Link
                                                                        href="/auth/Register"> Register
                                                                    </Link>
                                                                </li>
                                                            )}
                                                        </Menu.Item> */}
                                            </>
                                                }




                                            {
                                                status === "authenticated" &&
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <li
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 list-none')}>
                                                                <Link href="/auth/profile"> Your Profile
                                                                </Link>
                                                            </li>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                onClick={() => signOut({ redirect: false })}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            }
                                        </Menu.Items>
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
                                        key={item.name}
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