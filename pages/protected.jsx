import { useState } from "react"
import { useSession, signOut } from "next-auth/react"


// If I try to access "/protected" without being authenticated I will be redirected to the login page with an message saying need to be singed in to access this page


const protectedPage = ({ }) => {
    // const { data: session, status } = useSession({ required: true })


    // if (status === "authenticated") {
    //     return (
    //         <>
    //             <p>Welcome {session.user.name}</p>
    //         </>
    //     )


    //     // Will never be displayed or maybe just one seconde before redirection
    // } else {
    //     return (
    //         <>
    //             <p>You are not signed in</p>
    //         </>
    //     )
    // }



    return(
        <h1>I AM VISIBLE ONLY IF LOGGED IN</h1>
    )







}

export default protectedPage 