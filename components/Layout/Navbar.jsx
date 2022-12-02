import Link from "next/link"
import { useState } from "react";

import { useSession, signOut } from "next-auth/react"

import { Navbar, Dropdown, Avatar } from "flowbite-react";

const Navigation = () => {
    const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

    const hamburgerMenuToggler = () => {
        setIsHamburgerOpened((prevState) => !prevState)
    }

    const { data: session, status } = useSession()


    console.log('Session from Navbar', session)
    console.log('Status from Navbar', status)



    if (1 === 1) {
        return (
            <>
                <nav className="fixed w-full z-20 top-0 left-0">
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
                                Flowbite
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
                                active={true}
                            >
                                Home
                            </Navbar.Link>
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
                </nav>
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