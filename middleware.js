// This will protect my pages but NOT MY API ROUTES
// To protect API routes --> unstable_getServerSession








const arrayOfProtectedPaths = [
    "/protected", "/spots/newSpot", "/auth/profile", "/auth/profile"
]


const shouldNotBeUser = [
    "/auth/Register", "/auth/SignIn"
]


import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';



export async function middleware(req) {

    const pathname = req.nextUrl.pathname
    console.log("pathname from middleware -->", pathname)

    const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
    console.log('session in middleware: ', session)
    //https://stackoverflow.com/questions/70157936/cannot-access-the-nextauth-session-data-in-next-js-12-middleware


    // Protect protected pages and send back query string for toastify
    if (arrayOfProtectedPaths.includes(pathname)) {
        if (session === null) {

            if (pathname === "/auth/profile") {
                return NextResponse.redirect(`http://localhost:3008/auth/SignIn?mustLogIn=access your profile`)
            }
            if (pathname === "/spots/newSpot") {
                return NextResponse.redirect(`http://localhost:3008/auth/SignIn?mustLogIn=create a new spot`)
            }
        }
    }

    // Prevent logged in user to access to register and sign in 
    if (shouldNotBeUser.includes(pathname)) {
        if (session !== null) {
            return NextResponse.redirect("http://localhost:3008/spots/allSpots?alreadyLoggedIn=true")
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
