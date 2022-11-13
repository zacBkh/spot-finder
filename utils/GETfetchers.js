// Utils fx that fetch DB without passing through API routes(useless) since we are using getServerSideProps to deliver all spots and one spot
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#:~:text=This%20is%20an%20unnecessary%20and%20inefficient%20approach

import connectMongo from "./connectMongo";
import Spot from "../models/spot";



// All spots
export
    const GETSpotFetcherAll = async () => {
        await connectMongo()

        const res = await Spot.find({})
            .populate("author", "name") // Populating ONLY author name
        const allSpots = JSON.parse(JSON.stringify(res));
        console.log('allSpots', allSpots)

        return allSpots;
    }



// Show page of one Spot
export
    const GETSpotFetcherOne = async (ID) => {
        await connectMongo()

        const response = await Spot.findById(ID)
        const indivSpot = JSON.parse(JSON.stringify(response));
        console.log('indivSpot', indivSpot)

        return indivSpot;
    }






