
import { useRef, useState } from "react";
import { useRouter } from 'next/router'

import EditSpotForm from "../../components/EditSpotForm";

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

            <p>CATEGORIES: {indivSpot.categories.join(", ")} </p>




            {/* Spot Edition */}
            <button
                onClick={() => setIsUnderEdition((prevState) => !prevState)}> {isUnderEdition ? "Cancel Spot Edition" : "Click here to Edit the Spot"}
            </button>

            {
                isUnderEdition &&
                <EditSpotForm
                    intialValues={indivSpot}
                    intialCheckbox={indivSpot.categories}

                    onEditSpot={handleEdit}
                />
            }




            {/* Spot Deletion */}
            <button
                className="block"
                onClick={() => setIsUnderDeletion((prevState) => !prevState)} >

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

