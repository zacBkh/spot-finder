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
