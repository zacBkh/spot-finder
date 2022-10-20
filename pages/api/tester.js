import Spot from '../../models/spot';

// This route will help us see which data is in our Database, delete etc

async function showAllSpots() {
    const DBData = await Spot.find({})
    return DBData
}



async function deleteAllSpots() {
    await Spot.deleteMany({})
    return await Spot.find({})
}




export default async function newSpot(req, res) {
    const showFx = await showAllSpots()
    res.json({ dataExisting: showFx });



    // const deleteFx = await deleteAllSpots()
    // res.json({ dataDeletede: deleteAllSpots });
}













