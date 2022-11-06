// This will protect my pages but NOT MY API ROUTES
// To protect API routes --> unstable_getServerSession


// Protect all the routes
export { default } from "next-auth/middleware"




// List of route that should be protected
// To include all dashboard nested routes (sub pages like /dashboard/settings, /dashboard/profile) you can pass matcher: "/dashboard/:path*" to config.
// For others patterns, check https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
    matcher: [
        "/protected",
        "/newSpot", // protecting page to create new spot
        // "/pages/api/:path*" // protecting all sub route of pages/api
    ]
}