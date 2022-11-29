
import SpotCard from "../../components/SpotCard";
import { useState, useEffect } from "react";



import FilterSpots from "../../components/CategoriesCheckboxes/FilterSpots";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';


import { GETSpotFetcherAll } from "../../utils/GETfetchers";



import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




export const getServerSideProps = async (context) => {

    try {
        // Executing the fx that will fetch all Spots
        const resultFetchGET = await GETSpotFetcherAll()


        return {
            props: {
                spots: resultFetchGET,
            },
        };



    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}









const allSpots = ({ spots }) => {
    const [activeCategories, setActiveCategories] = useState([]);

    const [filterMode, setFilterMode] = useState(false);

    const [toastNotif, setToastNotif] = useState(false);



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
    const notifyToast = (text, id) => {
        toast.success(text, {
            position: toast.POSITION.BOTTOM_LEFT,
            toastId: id // prevent duplicates
        });
    }

    // Display toaster
    useEffect(() => {
        console.log('-- RUNNING IN BROWSER -- ')


        const getLS = localStorage.getItem("toast");
        console.log('getLS', getLS)
        switch (getLS) {
            case "newSpot":
                notifyToast("Password changed!", "resetPwd");
                break;

            case "editSpot":
                notifyToast("You edited your spot successfully!", "editSpot");
                break;

            case "deleteSpot":
                notifyToast("You deleted your spot successfully!", "deleteSpot");
                break;

            case "resetPwd":
                notifyToast("Password changed!", "resetPwd")
                break;

            default:
                console.log("MAN WTF IDK THAT");
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