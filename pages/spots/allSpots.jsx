import SpotCard from "../../components/SpotCard";
import { useState, useEffect } from "react";

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]';

import capitalize from "../../utils/capitalize";

import FilterSpots from "../../components/CategoriesCheckboxes/FilterSpots";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';


import { GETSpotFetcherAll } from "../../utils/GETfetchers";



import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




export const getServerSideProps = async (context) => {


    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    try {
        // Executing the fx that will fetch all Spots
        const resultFetchGET = await GETSpotFetcherAll()


        return {
            props: {
                spots: resultFetchGET,
                currentUserName: session ? session.user.name : null
            },
        };



    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}









const allSpots = ({ spots, currentUserName }) => {
    const [activeCategories, setActiveCategories] = useState([]);

    const [filterMode, setFilterMode] = useState(false);




    // Execute when click on filter
    const handleClickFilter = (e) => {
        const filterRequired = e.target.value
        console.log('filterRequired', filterRequired)

        if (activeCategories.includes(filterRequired)) { // if already in array -> remove
            setActiveCategories(
                (prevState) => prevState.filter(x => x !== filterRequired)
            )
        } else { // if NOT already in array -> add
            setActiveCategories(
                (prevState) => [...prevState, filterRequired]
            )
        }
    }



    // Once category state has been updated, check if there is something inside or not...
    useEffect(() => {
        if (!activeCategories.length) { //  if nothing, reset filters
            setFilterMode(false)
        } else {
            setFilterMode(true) // if at least one item, filter mode on
        }
    }, [activeCategories])





    // Toast after pwd change attempd
    const notifyToast = (type, text, id) => {
        toast[type](text, {
            position: toast.POSITION.BOTTOM_LEFT,
            toastId: id // prevent duplicates
        });
    }


    // Capitalize and take only first string of current user
    if (currentUserName) { currentUserName = capitalize(currentUserName.split(" ")[0]) }


    // Display toaster
    useEffect(() => {

        const getLS = localStorage.getItem("toast");
        console.log('getLS', getLS)
        switch (getLS) {

            case "newUser":
                notifyToast("success", "Welcome to spot-finder!", "newUser")
                break;

            case "loggedIn":
                notifyToast("success", `Hi ${currentUserName}, welcome back!`, "newUser")
                break;

            case "newSpot":
                notifyToast("success", "Password changed!", "resetPwd");
                break;

            case "editSpot":
                notifyToast("success", "You edited your spot successfully!", "editSpot");
                break;

            case "deleteSpot":
                notifyToast("success", "You deleted your spot successfully!", "deleteSpot");
                break;

            case "resetPwd":
                notifyToast("success", "Password changed!", "resetPwd")
                break;
        }

        localStorage.removeItem("toast");

    }, [])


    // ES6 filtering way
    // If filterMode is on, then filter, otherwise, just map components
    return (
        <>

            <button
                onClick={notifyToast}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Blue
            </button>

            <ToastContainer
                autoClose={4000}
                style={{ width: "400px" }}
            />



            <div className="flex flex-row justify-center">
                <FilterSpots
                    icon={<BsSunset />}
                    value={"Sunset"}
                    onClick={handleClickFilter}
                    activeCategories={activeCategories}
                />

                <FilterSpots
                    icon={<BsBuilding />}
                    value={"Urban"}
                    onClick={handleClickFilter}
                    activeCategories={activeCategories}
                />

                <FilterSpots
                    icon={<BsFillTreeFill />}
                    value={"Nature"}
                    onClick={handleClickFilter}
                    activeCategories={activeCategories}
                />
            </div>



            <div
                className=" 
                    mt-14 max-w-6xl	mx-auto 
                    grid grid-cols-4 gap-4 justify-center">
                {
                    filterMode ?
                        spots
                            .filter((spot) =>
                                spot.categories.some(x => activeCategories.includes(x))
                            )
                            .map((spot) =>
                                <SpotCard
                                    key={spot._id}
                                    id={spot._id}
                                    title={spot.title}
                                    description={spot.description}
                                    categories={spot.categories}
                                    author={spot.author.name}
                                />
                            )
                        :
                        spots
                            .map((spot) =>
                                <SpotCard
                                    key={spot._id}
                                    id={spot._id}
                                    title={spot.title}
                                    description={spot.description}
                                    categories={spot.categories}
                                    author={spot.author.name}
                                />
                            )
                }
            </div>




        </>
    )
}

export default allSpots 