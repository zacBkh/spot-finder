import Spot from '../../models/spot';
import User from '../../models/user';

import connectMongo from "../../utils/connectMongo"

import createToken from "../../utils/JWTMailToken/createToken"

// This route will help us see which data is in our Database, delete etc


const tokenGen = async (resArg) => {
    const final = await createToken("id1234", "zachariedupain@hotmail.fr", "1d")

    return resArg.send(final)
}








async function showAllSpots(resArg) {
    const DBData = await Spot.find({})
    return resArg.send(DBData);

}


async function deleteAllSpots(resArg) {
    const DBData = await Spot.deleteMany({})
    return resArg.send(DBData);
}







async function showAllUsers(resArg) {
    const DBData = await User.find({})
    return resArg.send(DBData);
}

async function deleteAllUsers(resArg) {
    const DBData = await User.deleteMany({})
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
    // await deleteAllUsers(res)
    // await checkUserExists(res, "roblaf93@gmail.com")
    // await tokenGen(res)




}




// 








