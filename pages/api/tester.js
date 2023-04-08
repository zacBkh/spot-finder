import Spot from '../../models/spot'
import User from '../../models/user'

import connectMongo from '../../utils/connectMongo'

import createToken from '../../utils/JWTMailToken/helpers/createToken'

// This route will help us see which data is in our Database, delete etc

const tokenGen = async resArg => {
    const final = await createToken('id1234', 'zachariedupain@hotmail.fr', '1d')

    return resArg.send(final)
}

async function showAllSpots(resArg) {
    const DBData = await Spot.find({})
    return resArg.send(DBData)
}

async function deleteAllSpots(resArg) {
    const DBData = await Spot.deleteMany({})
    return resArg.send(DBData)
}

async function showAllUsers(resArg) {
    const DBData = await User.find({})
    return resArg.send(DBData)
}

async function deleteAllUsers(resArg) {
    const DBData = await User.deleteMany({})
    return resArg.send(DBData)
}

async function checkUserExists(resArg, email) {
    const DBData = await User.findOne({ email: email })
    console.log(!DBData) // if does not find DBData === null
    return resArg.send(DBData)
}

//Delete all users except
async function deleteAllUsersBut(resArg, userIDToKeep) {
    const DBData = await User.deleteMany({ _id: { $nin: [userIDToKeep] } })

    return resArg.send(DBData)
}

async function helpppp(resArg, userDeleted) {
    const DBData = await Spot.find({}).populate('reviews')

    // .find({ "reviews.reviewAuthor": userDeleted })
    // .populate("reviews")

    return resArg.send(DBData)
}

// async function help(resArg) {
//     const DBData = Spot.find({})/* .populate("reviews") */

//     return resArg.send(DBData);
// }

// Show Spots visited by a x user
async function showAllVisitedSpots(resArg, userID) {
    const DBData = await Spot.find({ visitors: userID })
    return resArg.send(DBData)
}

export default async function TESTER(req, res) {
    await connectMongo()

    // await helpppp(res, "638d7783050b1dd32d06c7c1")

    // await showAllSpots(res)
    await showAllVisitedSpots(res, '642ced6dd3fa11d36106522b')
    // await deleteAllSpots(res)

    // await showAllUsers(res)
    // await deleteAllUsers(res)
    // await deleteAllUsersBut(res, "637c4b8252e6f480e190104f")

    // await checkUserExists(res, "roblaf93@gmail.com")
    // await tokenGen(res)
}

//
