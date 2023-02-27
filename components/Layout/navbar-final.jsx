import { Fragment } from "react";
import Image from "next/image";

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

const NavigationBar = () => {
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
    <header>
      <div id="logo">Spot Finder</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
            <Link href="/spots/newSpot">Add your Spot!</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
