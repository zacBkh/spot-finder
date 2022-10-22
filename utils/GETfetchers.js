
import connectMongo from "./connectMongo";
import Spot from "../models/spot";


// All spots
export
    const GETSpotFetcherAll = async () => {
        // Connecting to MongoDB
        await connectMongo()

        const res = await Spot.find({})
        const allSpots = JSON.parse(JSON.stringify(res));
        console.log('allSpots', allSpots)

        return allSpots;
    }




// Show page of one Spot
export
    const GETSpotFetcherOne = async (ID) => {
        // Connecting to MongoDB
        await connectMongo()

        const response = await Spot.findById(ID)
        const indivSpot = JSON.parse(JSON.stringify(response));
        console.log('indivSpot', indivSpot)

        return indivSpot;
    }





