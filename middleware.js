// This will protect my pages but NOT MY API ROUTES
// To protect API routes --> unstable_getServerSession

import { PATHS } from './constants/URLs'
const { DOMAIN } = PATHS

const arrayOfProtectedPaths = ['/spots/newSpot', '/auth/profile']

const shouldNotBeUser = ['/auth/register', '/auth/SignIn']

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

            if (pathname === '/auth/profile') {
                return NextResponse.redirect(
                    `${DOMAIN}auth/SignIn?mustLogIn=access your profile&returnTo=/auth/profile`,
                )
            }
            if (pathname === '/spots/newSpot') {
                return NextResponse.redirect(
                    `${DOMAIN}auth/SignIn?mustLogIn=create a new spot&returnTo=${returnTo}`,
                )
            }
        }
    }

    // Prevent logged in user to access to register and sign in
    if (shouldNotBeUser.includes(pathname)) {
        if (session !== null) {
            return NextResponse.redirect(`${DOMAIN}?alreadyLoggedIn=true`)
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
