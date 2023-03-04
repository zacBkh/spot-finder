// This will protect my pages but NOT MY API ROUTES
// To protect API routes --> unstable_getServerSession

import { PATHS } from './constants/URLs'
const { DOMAIN, DOMAIN_WITHOUT_SLASH, AUTH, PROFILE, NEW_SPOT } = PATHS
import REDIRECT_QUERY_PARAMS from './constants/redirect-query-params'
const {
    KEY_AUTH,
    VALUE_CREATE_SPOT,
    VALUE_ACCESS_PROFILE,
    KEY_RETURN_TO,
    VALUE_ALREADY_LOGGED_IN,
} = REDIRECT_QUERY_PARAMS

const arrayOfProtectedPaths = [NEW_SPOT, PROFILE]
const shouldNotBeUser = [AUTH, '/auth/register', '/auth/SignIn']

import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
    const pathname = req.nextUrl.pathname

    const session = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // Protect protected pages
    //  send back query string for toastify + returnTo behaviour
    if (arrayOfProtectedPaths.includes(pathname)) {
        if (session === null) {
            const returnTo = req.nextUrl.pathname
            console.log('returnto', returnTo)

            if (pathname === PROFILE) {
                return NextResponse.redirect(
                    `${DOMAIN_WITHOUT_SLASH}${AUTH}?${KEY_AUTH}=${VALUE_ACCESS_PROFILE}&${KEY_RETURN_TO}=${PROFILE}`,
                )
            }
            if (pathname === NEW_SPOT) {
                return NextResponse.redirect(
                    `${DOMAIN_WITHOUT_SLASH}${AUTH}?${KEY_AUTH}=${VALUE_CREATE_SPOT}&${KEY_RETURN_TO}=${NEW_SPOT}`,
                )
            }
        }
    }

    // Prevent logged in user to access to register and sign in
    if (shouldNotBeUser.includes(pathname)) {
        if (session !== null) {
            return NextResponse.redirect(
                `${DOMAIN_WITHOUT_SLASH}?${KEY_AUTH}=${VALUE_ALREADY_LOGGED_IN}`,
            )
        }
    }
}

// Middleware solution next auth with next js but didn't use it because could not add in on top of regular next js middleware
// MAYBE SOLUTION HERE https://github.com/nextauthjs/next-auth/discussions/5698
// // Protect all the routes
// export { default } from "next-auth/middleware"

// // List of route that should be protected
// // To include all dashboard nested routes (sub pages like /dashboard/settings, /dashboard/profile) you can pass matcher: "/dashboard/:path*" to config.
// // For others patterns, check https://nextjs.org/docs/advanced-features/middleware#matcher
// export const config = {
//     matcher: [
//         "/protected",
//         "/spots/newSpot",
//         "/auth/profile",

//         // "/pages/api/:path*" // protecting all sub route of pages/api
//     ]
// }
