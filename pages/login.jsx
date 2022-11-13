import { useState } from "react"

import { useSession, signIn, signOut } from "next-auth/react"




const login = ({ }) => {
    const { data: session } = useSession()

    console.log('Session from Login', session)


    if (session) {// If logged in...
        return (
            <>
                Signed in as {session.user.email} <br />
                Welcome {session.user.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )



    } else {
        return (
            <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </>
        )
    }






}

export default login