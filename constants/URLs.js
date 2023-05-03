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
    NEW_SPOT: '/new-spot',
    AUTH: '/auth/login',
    PROFILE: '/users',
    SPOT: '/spots',
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

    {
        name: 'Why Spot Finder ?',
        link: PATHS.HOME,
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
