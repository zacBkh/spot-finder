import { useState } from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

import { useRouter } from 'next/router'
import { editSpotHandler, deleteSpotHandler, addOneVisitSpotHandler } from "../../utils/APIfetchers";

import didUserVisited from "../../utils/Spots/didUserVisitedSpot";


import { GETSpotFetcherOne } from "../../utils/GETfetchers";


import SpotAction from "../../components/SpotAction";

import { Toast } from 'flowbite-react';
import { FaUserLock } from 'react-icons/Fa';

import Link from 'next/link';

import Toggler from '../../components/Toggler';


import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    useControl
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import Pin from '../../components/Mapbox/Pin';




export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)



    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID

        // Executing the fx that will fetch the precise Spot
        const resultFetchGETOne = await GETSpotFetcherOne(ID)



        return {
            props: {
                indivSpot: resultFetchGETOne,
                currentUserID: session ? session.userID : null,
            },
        };


    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}




const ShowSpot = ({ indivSpot, currentUserID }) => {

    // State that manages toggler + give info to API route whether to decrement or increment
    const didVisit = didUserVisited(indivSpot.visited.visitors, currentUserID)
    const [didUserVisitSpot, setDidUserVisitSpot] = useState(didVisit);


    // Did this to update in real time nb of visits when user toggle
    const nbVisit = indivSpot.visited.numberOfVisits
    const [nbOfVisit, setNbOfVisit] = useState(nbVisit);


    // Toast notif
    const [addVisitNotif, setAddVisitNotif] = useState(undefined);


    // To tell to API route which spot are we talking about -- can replace by info coming from GSP ? 
    const router = useRouter();
    const { spotID } = router.query



    // Will call the fetcher for Edit located in utils - params come from children
    const handleEdit = async (editedEnteredData) => {
        await editSpotHandler(editedEnteredData, spotID)
        router.push("/spots/allSpots") //Navigate back to root
    }


    // Will call the fetcher for DELETE located in utils
    const handleAddVisit = async () => {
        const addVisit = await addOneVisitSpotHandler(currentUserID, spotID, didUserVisitSpot)
        console.log('addVisit', addVisit)

        if (!addVisit.success && !currentUserID) { // if failure in add success and user not logged in...
            console.log('111')
            setAddVisitNotif(
                <>
                    <Link
                        href="/api/auth/signin">
                        <a className='text-blue-600 underline'>Log in</a>
                    </Link>
                    <span> to mark this spot as visited! </span>
                </>
            )



        } else { // if success...
            setDidUserVisitSpot((prevState) => !prevState)
            setNbOfVisit((prevState) => didUserVisitSpot ? prevState - 1 : prevState + 1)
        }

        // Redirect
        <Link
            href="/login">
            <a>Login Manual</a>
        </Link>
    }

    // Will call the fetcher for DELETE located in utils
    const handleDelete = async () => {
        await deleteSpotHandler(spotID)
        router.push("/spots/allSpots") //Navigate back to root
    }



    // If owner of camp, don't display toggle
    let shouldTogglerDisplay
    if (!currentUserID) { // if not logged in
        shouldTogglerDisplay = true
    } else if (currentUserID === indivSpot.author) { // if logged in and author
        shouldTogglerDisplay = false
    } else { // if logged in and NOT author
        shouldTogglerDisplay = true
    }


    return (
        <>

            <div className='flex justify-center'>
                <Map
                    initialViewState={{
                        longitude: 55.18,
                        latitude: 25.07,
                        zoom: 2
                    }}
                    style={{ width: 700, height: 500 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    attributionControl={false} >





                    <Marker
                        longitude={indivSpot.geometry.coordinates[0]}
                        latitude={indivSpot.geometry.coordinates[1]}
                        color="red"

                    >
                        <Pin
                            size={20}
                        />
                    </Marker>

                    <FullscreenControl />
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />

                </Map>
            </div >




            <p>Title: {indivSpot.title}</p>
            <p>Description: {indivSpot.description}</p>
            <p>Country: {indivSpot.country}</p>
            <p> This Spot has been visited {nbOfVisit} times </p>



            {
                shouldTogglerDisplay &&
                <Toggler
                    onToggle={handleAddVisit}
                    didUserVisitSpot={didUserVisitSpot}
                />
            }



            {/* Toast */}
            {
                addVisitNotif &&
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                        <FaUserLock className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {addVisitNotif}
                    </div>
                    <Toast.Toggle />
                </Toast>
            }












            <p>CATEGORIES: {indivSpot.categories.join(", ")} </p>
            <p>LATITUDE: {indivSpot.locationDrag.Latitude}</p>
            <p>LONGITUDE: {indivSpot.locationDrag.Longitude}</p>






            {/* Spot Edition */}
            {
                // status === "authenticated" &&
                currentUserID === indivSpot.author &&
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
                // status === "authenticated" &&
                currentUserID === indivSpot.author &&
                <SpotAction
                    action={"deletion"}
                    message1={"Click here to Delete the Spot"}
                    message2={"Do you really want to delete the Spot?"}

                    onSpotAction={handleDelete}
                    previousValues={indivSpot}
                />
            }
        </>
    )
}

export default ShowSpot

