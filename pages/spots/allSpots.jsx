
import SpotCard from "../../components/SpotCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"

import categoriesVariable from "../../utils/spotCategories";


import FilterTry from "../../components/CategoriesCheckboxes/FilterTry";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';


import { GETSpotFetcherAll } from "../../utils/GETfetchers";

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
    const router = useRouter()
    console.log('router.query', router.query)
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


    // ES6 filtering way
    // If filterMode is on, then filter, otherwise, just map components
    return (
        <>

            <div className="flex flex-row justify-center">
                <FilterTry
                    icon={<BsSunset />}
                    value={"Sunset"}
                    onClick={handleClickFilter}
                    activeCategories={activeCategories}
                />

                <FilterTry
                    icon={<BsBuilding />}
                    value={"Urban"}
                    onClick={handleClickFilter}
                    activeCategories={activeCategories}
                />

                <FilterTry
                    icon={<BsBuilding />}
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
                                />
                            )
                }
            </div>




        </>
    )
}

export default allSpots 