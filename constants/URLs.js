import { whichEnv } from '../utils/env-helper'
const currentEnvironment = whichEnv()

export const PATHS = {
    DOMAIN:
        currentEnvironment === 'development'
            ? 'http://localhost:3008/'
            : 'https://www.spot-finder.com/',
    DOMAIN_WITHOUT_SLASH:
        currentEnvironment === 'development'
            ? 'http://localhost:3008'
            : 'https://www.spot-finder.com',
    HOME: '/',
    WHY_SPOT_FINDER: '/why-spot-finder',
    NEW_SPOT: '/new-spot',
    AUTH: '/auth/login',
    PROFILE: '/users',
    SPOT: '/spots',
}

const { HOME, NEW_SPOT, WHY_SPOT_FINDER, PROFILE } = PATHS

import { AiFillHome } from 'react-icons/ai'
import { BsFillCameraFill } from 'react-icons/bs'
import { BsMegaphoneFill } from 'react-icons/bs'

export const NAVBAR_ITEMS = [
    {
        name: 'Home',
        link: HOME,
        icon: <AiFillHome />,
    },

    {
        name: 'Add your Spot!',
        link: NEW_SPOT,
        icon: <BsFillCameraFill />,
    },

    {
        name: 'Why Spot Finder ?',
        link: WHY_SPOT_FINDER,
        icon: <BsMegaphoneFill />,
    },
]

export const NAVBAR_USER_ITEMS = [
    {
        name: 'My Profile',
        link: PROFILE,
    },

    {
        name: 'Settings',
        link: HOME,
    },
    {
        name: 'Sign Out',
        link: NEW_SPOT,
    },
]
