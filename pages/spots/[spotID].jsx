
import { useState } from "react";
import { useRouter } from 'next/router'

import BothSpotForm from "../../components/Forms/BothSpotForm";

import { editSpotHandler, deleteSpotHandler } from "../../utils/APIfetchers";


import { GETSpotFetcherOne } from "../../utils/GETfetchers";

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

    const [isUnderEdition, setIsUnderEdition] = useState(false);
    const [isUnderDeletion, setIsUnderDeletion] = useState(false);

    const enterEditionHandler = () => {
        setIsUnderEdition((prevState) => !prevState);
        setIsUnderDeletion(false)
    }


    const enterDeletionHandler = () => {
        setIsUnderDeletion((prevState) => !prevState);
        setIsUnderEdition(false)
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



    return (
        <>
            <p>Title: {indivSpot.title}</p>
            <p>Description: {indivSpot.description}</p>
            <p>Country: {indivSpot.country}</p>

            <p>CATEGORIES: {indivSpot.categories.join(", ")} </p>
            <p>LATITUDE: {indivSpot.locationDrag.Latitude}</p>
            <p>LONGITUDE: {indivSpot.locationDrag.Longitude}</p>




            {/* Spot Edition */}
            <button
                onClick={enterEditionHandler}>
                {isUnderEdition ? "Cancel Spot Edition" : "Click here to Edit the Spot"}
            </button>

            {
                isUnderEdition &&
                <BothSpotForm
                    previousValues={indivSpot}

                    onAddOrEditFx={handleEdit}
                />
            }




            {/* Spot Deletion */}
            <button
                className="block"
                onClick={enterDeletionHandler} >

                {isUnderDeletion ? "Do you really want to delete the Spot?" : "Click here to Delete the Spot"}
            </button>

            {
                isUnderDeletion &&
                <>
                    <button className="mr-6" onClick={handleDelete}> Yes </button>
                    <button onClick={() => setIsUnderDeletion(false)}> No </button>
                </>
            }
        </>
    )
}

export default ShowSpot

