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
    PROFILE: '/auth/profile',
    AUTH: '/auth/login',
    PROFILE: '/auth/profile',
    PROFILE2: '/auth/profile-new',
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
        name: 'My Profile2',
        link: PATHS.PROFILE2,
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
