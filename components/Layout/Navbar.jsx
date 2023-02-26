import { Fragment } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import capitalize from "../../utils/capitalize";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext, useRef } from "react";
import AppContext from "../../context/AppContext";

import { useSession, signOut } from "next-auth/react";

import { BiTargetLock } from "react-icons/bi";

import {
  AiOutlineMenu,
  AiOutlineBell,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import PATHS from "../../constants/URLs";
const { HOME } = PATHS;

const Navigation = () => {
  const searchContext = useContext(AppContext);

  const router = useRouter();

  const { data: session, status } = useSession();

  const navigation = [
    { name: "Home", href: HOME, current: true },
    { name: "Add your Spot!", href: "/spots/newSpot", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {/* Left part of the navbar */}
      <Disclosure
        as="nav"
        className="bg-gray-800   fixed w-full z-20 top-0 left-0 "
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <AiOutlineClose
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineMenu
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="text-white flex flex-shrink-0 items-center">
                    <BiTargetLock className="mr-2 text-xl block h-8 w-auto lg:hidden" />
                    <BiTargetLock className="mr-2 text-xl block h-8 w-auto lg:hidden" />
                  </div>

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => {
                        if (item !== null) {
                          return (
                            <Link href={item.href} key={item.href}>
                              <a
                                className={classNames(
                                  router.pathname === item.href
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium list-none	"
                                )}
                              >
                                {item.name}
                              </a>
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {/* Right part of the navbar */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {router.pathname === "/" && (
                    <div className=" 0/10 relative hidden md:block mr-12">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineSearch className=" text-gray-400 text-lg " />

                        <span className="sr-only">Search icon</span>
                      </div>

                      <input
                        value={searchContext.value}
                        onChange={(e) =>
                          searchContext.addSearch(e.target.value)
                        }
                        type="text"
                        id="search-navbar"
                        placeholder="Search a Spot..."
                        className=" focus:ring-white focus:border-white border-0
                      text-white text-sm block w-full p-2 pl-10 rounded-lg bg-gray-700"
                      />

                      {searchContext.value.length > 0 && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          <AiOutlineClose
                            onMouseDown={(e) => e.preventDefault()} // prevent focus
                            onClick={() => searchContext.addSearch("")}
                            className="text-lg text-gray-400"
                          />
                        </button>
                      )}
                    </div>
                  )}

                  {status === "authenticated" && (
                    <Link href="/auth/profile">
                      <a
                        className={classNames(
                          router.pathname === "/auth/profile"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium list-none"
                        )}
                      >
                        {`Hello, ${capitalize(session.user.name)}`}
                      </a>
                    </Link>
                  )}

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
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm ">
                        <span className="sr-only">Open user menu</span>

                        {session && session.user.image ? (
                          <Image
                            width={30}
                            height={30}
                            className="h-8 w-8 rounded-full"
                            src={session.user.image}
                            alt="Profile picture"
                          />
                        ) : (
                          <BiUserCircle className="text-3xl text-white" />
                        )}
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
                        {status !== "authenticated" && (
                          <>
                            <Menu.Item>
                              <li
                                className={
                                  "block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"
                                }
                              >
                                <Link href="/auth/Register">
                                  <a className="block"> Register </a>
                                </Link>
                              </li>
                            </Menu.Item>

                            <Menu.Item>
                              <li
                                className={
                                  "block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"
                                }
                              >
                                <Link href="/auth/SignIn">
                                  <a className="block"> Login </a>
                                </Link>
                              </li>
                            </Menu.Item>
                          </>
                        )}

                        {status === "authenticated" && (
                          <>
                            <Menu.Item>
                              <Link href="/auth/profile">
                                <a
                                  className={
                                    "block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"
                                  }
                                >
                                  {" "}
                                  My Profile
                                </a>
                              </Link>
                            </Menu.Item>

                            <Menu.Item>
                              <Link href="/auth/profile">
                                <a
                                  className={
                                    "block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"
                                  }
                                >
                                  {" "}
                                  Settings
                                </a>
                              </Link>
                            </Menu.Item>

                            <button
                              onClick={() => signOut()}
                              className={
                                "block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"
                              }
                            >
                              Sign out
                            </button>

                            {/* <Menu.Item>
                              <button
                                onClick={() => signOut()}
                                className={
                                  "block px-4 py-2 text-sm text-gray-700 list-none hover:bg-gray-100"
                                }
                                // onClick={async () => {
                                //   await signOut({ redirect: false });
                                //   // signOut();
                                //   // Removed the avoid reload because causing error when signing out from show page
                                //   router.push(HOME);
                                // }}
                              >
                                Sign out
                              </button>
                            </Menu.Item> */}
                          </>
                        )}
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
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    );
                  }
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navigation;
