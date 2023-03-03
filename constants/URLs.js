import { whichEnv } from '../utils/env-helper'
const currentEnvironment = whichEnv()

export const PATHS = {
    DOMAIN:
        currentEnvironment === 'development'
            ? 'http://localhost:3008/'
            : 'https://spot-finder.vercel.app/',
    HOME: '/',
    NEW_SPOT: 'spots/newSpot',
    PROFILE: '/auth/profile',
    AUTH: '/auth/login',
}

export const NAVBAR_ITEMS = [
    {
        name: 'Home',
        link: PATHS.HOME,
    },

    {
        name: 'Add your Spot!',
        link: PATHS.NEW_SPOT,
    },
]

export const NAVBAR_VISITOR_ITEMS = [
    {
        name: 'Sign up or login',
        link: PATHS.AUTH,
    },
]

export const NAVBAR_USER_ITEMS = [
    {
        name: 'My Profile',
        link: PATHS.PROFILE,
    },

    {
        name: 'Settings',
        link: PATHS.HOME,
    },
    {
        name: 'Sign Out',
        link: PATHS.NEW_SPOT,
    },
]
