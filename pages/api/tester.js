import Spot from '../../models/spot';

import connectMongo from "../../utils/connectMongo"

// This route will help us see which data is in our Database, delete etc




async function showAllSpots(resArg) {
    const DBData = await Spot.find({})
    return resArg.json({ dataExisting: DBData });

}



async function deleteAllSpots(resArg) {
    await Spot.deleteMany({})
    return resArg.json({ dataExisting: showAllSpots() })
}







export default async function TESTER(req, res) {
    await connectMongo();


    await showAllSpots(res)

    // await deleteAllSpots(res)


}













