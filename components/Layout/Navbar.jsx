import { Navbar, Button } from "flowbite-react";
import Link from "next/link"

import { useState } from "react";

const Navigation = () => {
    const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

    const hamburgerMenuToggler = () => {
        setIsHamburgerOpened((prevState) => !prevState)
    }


    return (
        <>
            <nav className={`
                py-4  px-2
                sticky-nav z-10
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
                                href="/api/tester">
                                <a>Tester</a>
                            </Link>
                        </li>


                        <li
                            className={`
                                text-base 2xl:text-lg medium  
                            `}>
                            <Link
                                href="/newSpot">
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
                            href="/newSpot">
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