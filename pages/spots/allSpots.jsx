import connectMongo from "../../utils/connectMongo";
import Spot from "../../models/spot";
import SpotsList from "../../components/SpotsList";

import { useState } from "react"


export const getServerSideProps = async (context) => {

    try {
        // Connecting to MongoDB
        await connectMongo()

        const res = await Spot.find({})
        const allSpots = JSON.parse(JSON.stringify(res));
        console.log('allSpots', allSpots)



        // I had to map the return (what will be passed as props in our component) to make the id field readable (from _id to id)
        return {
            props: {
                spots: allSpots,
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

    return (
        <>
            <div
                className="grid grid-flow-col auto-cols-max space-x-6 justify-center">
                {
                    spots.map((spot) =>
                        <SpotsList
                            key={spot._id}
                            id={spot._id}
                            title={spot.title}
                            description={spot.description}
                        />
                    )
                }
            </div>
        </>
    )
}

export default allSpots 