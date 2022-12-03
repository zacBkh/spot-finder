import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'






import Link from "next/link"
import { useState } from "react";

import { useSession, signOut } from "next-auth/react"

// import { Navbar, Dropdown, Avatar } from "flowbite-react";

// import { AiOutlineMenu, AiOutlineBell, AiOutlineClose } from 'react-icons/ai';



const Navigation = () => {
    const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

    const hamburgerMenuToggler = () => {
        setIsHamburgerOpened((prevState) => !prevState)
    }

    const { data: session, status } = useSession()


    console.log('Session from Navbar', session)
    console.log('Status from Navbar', status)



    const navigation = [
        { name: 'Dashboard', href: '#', current: true },
        { name: 'Team', href: '#', current: false },
        { name: 'Projects', href: '#', current: false },
        { name: 'Calendar', href: '#', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    if (1 === 1) {
        return (
            <>
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
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
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
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        <button
                                            type="button"
                                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Your Profile
                                                            </a>
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
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
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
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>





                {/*                 <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                    <Navbar
                        fluid={true}
                        rounded={true}
                    >

                        <Navbar.Brand href="https://flowbite.com/">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="mr-3 h-6 sm:h-9"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                SpotFinder
                            </span>
                        </Navbar.Brand>


                        <div className="flex md:order-2">
                            <Dropdown
                                arrowIcon={false}
                                inline={true}
                                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        Bonnie Green
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        name@flowbite.com
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item>
                                    Dashboard
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Earnings
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </div>




                        <Navbar.Collapse>
                            <Navbar.Link
                                href="/navbars"
                                active={true}>Home
                            </Navbar.Link>

                            <li
                                className={`
                                text-base 2xl:text-lg medium 
                            `}>
                                <Link
                                    href="/spots/allSpots">
                                    <a>Home</a>
                                </Link>
                            </li>



                            <Navbar.Link href="/navbars">
                                About
                            </Navbar.Link>
                            <Navbar.Link href="/navbars">
                                Services
                            </Navbar.Link>
                            <Navbar.Link href="/navbars">
                                Pricing
                            </Navbar.Link>
                            <Navbar.Link href="/navbars">
                                Contact
                            </Navbar.Link>
                        </Navbar.Collapse>
                    </Navbar>
                </nav> */}
            </>
        )
    }












    return (
        <>
            <nav className={`
                py-4  px-2
               
                fixed  z-10 top-0
                mx-auto 
                bg-slate-400
            `} >

                <div
                    className="flex items-center justify-end md:justify-around">


                    {/*  MENU ITEMS  */}
                    <ul
                        className=" hidden md:flex  space-x-16">
                        <li
                            className={`
                                text-base 2xl:text-lg medium 
                            `}>
                            <Link
                                href="/spots/allSpots">
                                <a>Home</a>
                            </Link>
                        </li>




                        <li
                            className={`
                                text-base 2xl:text-lg medium  
                            `}>
                            <Link
                                href="/spots/newSpot">
                                <a>Add your Spot</a>
                            </Link>
                        </li>



                        <li
                            className={`
                                text-base 2xl:text-lg medium
                            `}>
                            <Link
                                href="/rgerg">
                                <a>Throw Error</a>
                            </Link>
                        </li>



                        {status !== "authenticated" &&
                            <li
                                className={`
                                text-base 2xl:text-lg medium
                            `}>
                                <Link
                                    href="/auth/Register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        }




                        {/* Logic conditional rendering Sign in */}
                        {
                            status !== "authenticated"
                                ?
                                <li
                                    className={`
                                    text-base 2xl:text-lg medium
                            `}>

                                    <Link
                                        href="/auth/SignIn">
                                        <a>Login</a>
                                    </Link>

                                </li>

                                :

                                <li
                                    className={`
                                    text-base 2xl:text-lg medium cursor-pointer	
                                `}>
                                    <a onClick={
                                        () => signOut({ redirect: false })
                                    }>Logout
                                    </a>
                                </li>
                        }








                        <li
                            className={`
                                text-base 2xl:text-lg medium
                            `}>
                            <Link
                                href="/protected">
                                <a>Protected Page</a>
                            </Link>
                        </li>






                        <li
                            className={`
                                text-base 2xl:text-lg medium
                            `}>
                            {status === "authenticated" && <p> {session.user.name} </p>}
                        </li>

                    </ul>


                    {/* Hamburger Icon only on mobile*/}
                    <button
                        onClick={hamburgerMenuToggler}
                        id="menu-btn"
                        className={
                            `${isHamburgerOpened ? "open" : null}
                           block hamburger md:hidden focus:outline-none`
                        }>
                        <span className="hamburger-top"></span>
                        <span className="hamburger-middle"></span>
                        <span className="hamburger-bottom"></span>
                    </button>
                </div>


                {/*  Mobile Menu */}
                <div className="md:hidden">
                    <div
                        id="menu"
                        className={`
                        ${isHamburgerOpened ? "flex" : "hidden"}
                        absolute flex-col items-center self-end   	 py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md z-50`}>

                        <Link
                            href="/spots/allSpots">
                            <a
                                onClick={hamburgerMenuToggler} > Home
                            </a>
                        </Link>

                        <Link
                            href="le-logement">
                            <a
                                onClick={hamburgerMenuToggler} > Le Logement
                            </a>
                        </Link>

                        <Link
                            href="/spots/newSpot">
                            <a
                                onClick={hamburgerMenuToggler} > Add your Spot
                            </a>
                        </Link>

                        <Link
                            href="booking">
                            <a
                                onClick={hamburgerMenuToggler} > Réserver
                            </a>
                        </Link>

                    </div>
                </div>


            </nav >

        </>
    )
}

export default Navigation 