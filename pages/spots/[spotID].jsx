import { useState } from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

import { useRouter } from 'next/router'
import { editSpotHandler, deleteSpotHandler, addOneVisitSpotHandler } from "../../utils/APIfetchers";

import didUserVisited from "../../utils/Spots/didUserVisitedSpot";


import { GETSpotFetcherOne } from "../../utils/GETfetchers";


import SpotAction from "../../components/SpotAction";


import Link from 'next/link';

import Toggler from '../../components/Toggler';


import MapShow from '../../components/Maps/MapShow';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




import Review from '../../components/Reviews/Review';
import { addOneReview } from '../../utils/APIfetchers';

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
                currentUserID: session ? session.userID : null
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








    // To tell to API route which spot are we talking about -- can replace by info coming from GSP ? 
    const router = useRouter();

    const { _id: spotID } = indivSpot



    // Will call the fetcher for Edit located in utils - params come from children
    const handleEdit = async (editedEnteredData) => {
        await editSpotHandler(editedEnteredData, spotID)

        // For toaster notif
        localStorage.setItem("toast", "editSpot");

        router.push("/spots/allSpots") //Navigate back to root
    }



    // // This will be rendered in the toast
    const CustomToastWithLink = (actionNotAllowed) => (
        <>
            <Link
                href="/auth/SignIn">
                <a className='text-[#3498db] underline'>Please login</a>
            </Link>
            <span>{actionNotAllowed}</span>
        </>
    );



    // Will call the fetcher for ADDING visit
    const handleAddVisit = async () => {
        const addVisit = await addOneVisitSpotHandler(currentUserID, spotID, didUserVisitSpot)

        // if failure in add success and user not logged in...
        if (!addVisit.success && !currentUserID) {
            toast.error(CustomToastWithLink(" to mark this spot as verified"), {
                position: "bottom-left",
                toastId: "connectToMarkVisitedSuccess"
            });


            // if success...
        } else {

            if (!didUserVisitSpot) {
                toast.success("You marked this spot as visited!", {
                    position: "bottom-left",
                    toastId: "connectToMarkVisitedSuccess"
                });
            } else {
                toast.success("You removed this spot from visited!", {
                    position: "bottom-left",
                    toastId: "connectToMarkVisitedSuccess"
                });
            }

            setDidUserVisitSpot((prevState) => !prevState)
            setNbOfVisit((prevState) => didUserVisitSpot ? prevState - 1 : prevState + 1)
        }
    }



    // Will call the fetcher for DELETE located in utils
    const handleDelete = async () => {
        await deleteSpotHandler(spotID)

        // For toaster notif
        localStorage.setItem("toast", "deleteSpot");

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



    // Review
    const [isReviewOpen, setIsReviewOpen] = useState(false);



    // Adding review + pushing its ID in Spot document
    const onReviewSubmit = async (reviewValues) => {
        console.log("reviewValuesfrom parent !!", reviewValues)
        const addRev = await addOneReview(spotID, currentUserID, reviewValues)
        console.log('addRev', addRev)

        if (!addRev.success) { console.log("ERROR ADDING A REVIEW", addRev.result) }

        setIsReviewOpen(false)

        toast.success("Thanks for the comment!", {
            position: "bottom-left",
            toastId: "commentSuccess"
        })

    }



    const openReviewHandler = () => {
        // If not logged in
        if (!currentUserID) {
            // HELPERR
            toast.error(CustomToastWithLink(" to add a review to the spot"), {
                position: "bottom-left",
                toastId: "connectToAddReview"
            });
            return
        }

        // If author tries to comment
        if (currentUserID === indivSpot.author) {
            toast.error("You cannot review a Spot you created, think about editing its content!", {
                position: "bottom-left",
                toastId: "cannotCommentIfAuthor"
            });
            return
        }


        setIsReviewOpen((prev) => !prev)
    }



    return (
        <>
            {
                <ToastContainer
                    autoClose={4000}
                    style={{ width: "400px" }}
                />
            }



            <MapShow
                initialView={{
                    longitude: 55.18,
                    latitude: 25.07,
                    zoom: 2
                }}
                markerCoordinates={{ Longitude: indivSpot.geometry.coordinates[0], Latitude: indivSpot.geometry.coordinates[1] }}
            />






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







            <p>CATEGORIES: {indivSpot.categories.join(", ")} </p>
            <p>LATITUDE: {indivSpot.locationDrag.Latitude}</p>
            <p>LONGITUDE: {indivSpot.locationDrag.Longitude}</p>


            <a className='cursor-pointer'
                onClick={openReviewHandler} >REVIEW THE SPOT
            </a>



            {
                isReviewOpen &&

                <Review
                    isLoggedIn={currentUserID}
                    isAuthor={currentUserID === indivSpot.author}
                    onReviewSubmit={onReviewSubmit}
                />
            }







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

