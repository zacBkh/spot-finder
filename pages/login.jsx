import { useState } from "react"

import { useSession, signIn, signOut } from "next-auth/react"




const login = ({ }) => {
    const { data: session } = useSession()

    console.log('session', session)
    // console.log('session.maxAge', session.maxAge)

    // const token = await getToken({ req })
    // console.log("JSON Web Token", token)



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