import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { editSpotHandler, deleteSpotHandler } from "../../utils/APIfetchers";

import { useSession } from "next-auth/react"


import { GETSpotFetcherOne } from "../../utils/GETfetchers";


import SpotAction from "../../components/SpotAction";

export const getServerSideProps = async (context) => {


    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID

        // Executing the fx that will fetch all Spots
        const resultFetchGETOne = await GETSpotFetcherOne(ID)

        return {
            props: {
                indivSpot: resultFetchGETOne,
            },
        };


    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}





const ShowSpot = ({ indivSpot }) => {

    // Need to wait status === "authenticated" to have access to session
    const { data: session, status } = useSession()
    status === "authenticated" ? console.log('session.userID', session) : null


    const [isUnderDeletion, setIsUnderDeletion] = useState(false);




    const enterDeletionHandler = () => {
        setIsUnderDeletion((prevState) => !prevState);
        // setIsUnderEdition(false)
    }

    const router = useRouter();
    const { spotID } = router.query



    // Will call the fetcher for Edit located in utils - params come from children
    const handleEdit = async (editedEnteredData) => {
        await editSpotHandler(editedEnteredData, spotID)
        router.push("/spots/allSpots") //Navigate back to root
    }

    // Will call the fetcher for DELETE located in utils
    const handleDelete = async () => {
        await deleteSpotHandler(spotID)
        router.push("/spots/allSpots") //Navigate back to root
    }


    // check if passed spot has been visited by passed user
    const didUserVisited = (spotVisitorsIDs, currentUserID) => {
        if (status === "authenticated") {
            console.log('A VOIR', spotVisitorsIDs.includes(currentUserID))
            const didVisit = indivSpot.visited.visitors.includes(session.userID)

            return didVisit ? "yes" : "no"
        }
    }

    return (
        <>
            <p>Title: {indivSpot.title}</p>
            <p>Description: {indivSpot.description}</p>
            <p>Country: {indivSpot.country}</p>
            <p> This Spot has been visited {indivSpot.visited.numberOfVisits} times </p>
            <p>Did you
                {
                    status === "authenticated" && didUserVisited(indivSpot.visited.visitors, session.userID)
                }
            </p>

            <p>CATEGORIES: {indivSpot.categories.join(", ")} </p>
            <p>LATITUDE: {indivSpot.locationDrag.Latitude}</p>
            <p>LONGITUDE: {indivSpot.locationDrag.Longitude}</p>






            {/* Spot Edition */}
            {
                status === "authenticated" &&
                session.userID === indivSpot.author &&
                <SpotAction
                    action={"edition"}
                    message1={"Click here to Edit the Spot"}
                    message2={"Cancel Spot Edition"}
                    onSpotAction={handleEdit}
                    previousValues={indivSpot}
                />
            }


            {/* Spot Deletion */}
            {
                status === "authenticated" &&
                // session.userID === indivSpot.author &&
                <SpotAction
                    action={"deletion"}
                    message1={"Click here to Delete the Spot"}
                    message2={"Do you really want to delete the Spot?"}

                    onSpotAction={handleDelete}
                    previousValues={indivSpot}
                />
            }


            {/* Spot Deletion */}
            {/*             <button
                className="block"
                onClick={enterDeletionHandler} >

                {isUnderDeletion ? "Do you really want to delete the Spot?" : "Click here to Delete the Spot"}
            </button> */}

            {/* {
                isUnderDeletion &&
                <>
                    <button className="mr-6" onClick={handleDelete}> Yes </button>
                    <button onClick={() => setIsUnderDeletion(false)}> No </button>
                </>
            } */}
        </>
    )
}

export default ShowSpot

