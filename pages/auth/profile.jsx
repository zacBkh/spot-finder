import { useState, useEffect } from "react"

import { signOut, SessionProvider } from "next-auth/react"


import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

import { useRouter } from 'next/router';


import { deleteUserHandler as deleteAPIFetcher } from "../../utils/APIfetchers";

export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)



    try {


        // Had to do this data manip to avoid error because of profile image not defined
        return {
            props: {
                currentUserSession: {
                    ...session.user,
                    userID: session.userID,
                    image: null
                },
            },
        };


    } catch (error) {
        console.log(error);
        return {
            notFound: true, // ????
        }
    }
}





const MyProfile = ({ currentUserSession }) => {

    const router = useRouter()

    console.log('currentUserSession', currentUserSession)


    const { email, emailVerified, name, provider, userID } = currentUserSession;


    // Will delete the user + his spots (mongoose middleware)
    const deleteUserHandler = async () => {
        console.log('WANT TO DELETE USER...')
        const deleteUser = await deleteAPIFetcher(userID)
        console.log('deleteUser', deleteUser)


        // For toaster notif
        localStorage.setItem("toast", "deleteUser");


        // Signing out user and redirect
        signOut({ callbackUrl: 'http://localhost:3008/spots/allSpots' })
    }


    return (
        <>
            <h1>{name}</h1>
            <h1>{emailVerified ? "true" : "false"}</h1>
            <h1>{email}</h1>
            <h1>{provider}</h1>
            <button
                onClick={deleteUserHandler} > Delete my account
            </button>
        </>
    )
}

export default MyProfile 