import Spot from '../../models/spot';
import User from '../../models/user';

import connectMongo from "../../utils/connectMongo"

// This route will help us see which data is in our Database, delete etc




async function showAllSpots(resArg) {
    const DBData = await Spot.find({})
    return resArg.send(DBData);

}


async function deleteAllSpots(resArg) {
    await Spot.deleteMany({})
    return resArg.send(DBData);
}







async function showAllUsers(resArg) {
    const DBData = await User.find({})
    return resArg.send(DBData);
}

async function checkUserExists(resArg, email) {
    const DBData = await User.findOne({ email: email })
    console.log(!DBData) // if does not find DBData === null 
    return resArg.send(DBData);
}






export default async function TESTER(req, res) {
    await connectMongo();




    // await showAllSpots(res)
    // await deleteAllSpots(res)


    // await showAllUsers(res)
    // await checkUserExists(res, "roblaf93@gmail.com")



}













