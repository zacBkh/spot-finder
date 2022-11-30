import { useState, useEffect } from "react"

import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"



export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)


    try {

        // Executing the fx that will fetch the precise Spot
        // const resultFetchGETOne = await GETSpotFetcherOne(ID)



        return {
            props: {
                currentUserID: session ? session.userID : null
            },
        };


    } catch (error) {
        console.log(error);
        return {
            notFound: true, // ????
        }
    }
}





const MyProfile = ({ currentUserID }) => {
    console.log('currentUserID', currentUserID)

    return (
        <>

        </>
    )
}

export default MyProfile 