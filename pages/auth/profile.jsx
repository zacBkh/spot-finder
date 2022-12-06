import { useState, useEffect } from "react"

import { signOut } from "next-auth/react"


import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

import getUserSpot from "../../utils/Users/getUserSpots";

import { deleteUserHandler as deleteAPIFetcher } from "../../utils/APIfetchers";

export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    const ownedSpots = await getUserSpot(session.userID)
    console.log('ownedSpots', ownedSpots)

    try {


        // Had to do this data manip to avoid error because of profile image not defined
        // INSTEAD OF DOING THIS WHY NOT JUST FETCH THE USER IN DB ??
        return {
            props: {
                currentUserSession: {
                    ...session.user,
                    userID: session.userID,
                    image: null,
                    ownedSpots: JSON.parse(JSON.stringify(ownedSpots.result)) // avoid serialization error
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


    console.log('currentUserSession', currentUserSession)


    const { email, emailVerified, name, provider, userID, ownedSpots } = currentUserSession;


    // Will delete the user + his spots (mongoose middleware)
    const deleteUserHandler = async () => {
        console.log('WANT TO DELETE USER...')
        const deleteUser = await deleteAPIFetcher(userID)
        console.log('deleteUser', deleteUser)


        // For toaster notif
        localStorage.setItem("toast", "deleteUser");


        // Signing out user and redirect
        signOut({ callbackUrl: home })
    }


    return (
        <>
            <h1>{name}</h1>
            <h1>{emailVerified ? "true" : "false"}</h1>
            <h1>{email}</h1>
            <h1>{provider}</h1>
            <h1>Number of spots: {ownedSpots.length}</h1>

            <button
                onClick={deleteUserHandler} > Delete my account
            </button>
        </>
    )
}

export default MyProfile 