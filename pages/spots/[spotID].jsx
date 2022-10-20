import connectMongo from "../../utils/connectMongo";
import Spot from '../../models/spot';

import { useRef, useState } from "react";
import { useRouter } from 'next/router'

import EditSpotForm from "../../components/EditSpotForm";




export const getServerSideProps = async (context) => {

    console.log('context.params.spotID', context.params.spotID)


    // Connecting to MongoDB and finding the precise spot
    try {
        await connectMongo()

        // Getting the ID
        const id = context.params.spotID


        const response = await Spot.findById(id)
        const indivSpot = JSON.parse(JSON.stringify(response));

        return {
            props: {
                indivSpot: indivSpot,
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



    // Fx to EDIT SPOT
    // Edited data will come from children through this fx
    const editSpotHandler = async (editedEnteredData) => {


        const response = await fetch(
            `/api/${spotID}`,
            {
                method: "PATCH",
                body: JSON.stringify(editedEnteredData), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )
        const data = await response.json()
        console.log("NEW Data from Mongo", data)

        router.push("/spots/allSpots") //Navigate back to root
    }




    // Fx to delete SPOT
    const deleteSpotHandler = async () => {
        const response = await fetch(
            `/api/${spotID}`,
            {
                method: "DELETE",
            }
        )
        const data = await response.json()
        console.log("DELETED Data from Mongo", data)

        router.push("/spots/allSpots") //Navigate back to root
    }


    return (
        <>
            <p>Title: {indivSpot.title}</p>
            <p>Description: {indivSpot.description}</p>
            <button
                onClick={() => setIsUnderEdition((prevState) => !prevState)}> {isUnderEdition ? "Cancel Spot Edition" : "Click here to Edit the Spot"}
            </button>

            {
                isUnderEdition &&
                <EditSpotForm
                    onEditSpot={editSpotHandler}
                />
            }





            <button
                className="block"
                onClick={() => setIsUnderDeletion((prevState) => !prevState)} >

                {isUnderDeletion ? "Do you really want to delete the Spot?" : "Click here to Delete the Spot"}
            </button>

            {
                isUnderDeletion &&
                <>
                    <button className="mr-6" onClick={deleteSpotHandler}> Yes </button>
                    <button onClick={() => setIsUnderDeletion(false)}> No </button>
                </>
            }


        </>
    )
}

export default ShowSpot

