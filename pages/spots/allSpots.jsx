
import SpotCard from "../../components/SpotCard";
import { useState } from "react";
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
    const [activeCategories, setActiveCategories] = useState(categoriesVariable);



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


    // ES6 filtering way
    return (
        <>
            <div
                className="grid grid-flow-col auto-cols-max space-x-6 justify-center">
                {
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
                }
            </div>

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

        </>
    )
}

export default allSpots 