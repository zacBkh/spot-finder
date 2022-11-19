import { useState } from "react"

import { useRouter } from 'next/router'


const error = ({ }) => {
    const router = useRouter()

    console.log('router.query', router.query)

    const { error } = router.query

    let averto
    if (error === "CredentialsSignin") { averto = "There has been an error verifying your credentials" }

    return (
        <>
            <h1>{averto}</h1>
        </>
    )
}

export default error 