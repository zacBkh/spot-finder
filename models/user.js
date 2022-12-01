import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

import Spot from './spot';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minLength: 6
        },

        emailVerified: {
            type: Boolean,
            default: false,
            required: true,
        },

        provider: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
);




// Deletion Middleware
// To delete respective Spots  when a user is deleted 
// Should : remove in spot.visited numberOfVisits -1 && in spot.visitors the id
// "userDeleted" is passed in => it's what we queried to delete

// userSchema.pre("findOneAndDelete", async function (userDeleted) {
//     console.log("==>111 MONGOOSE DELETION OF SPOT CREATED BY DELETED USERS TRIGGERED !! <==")
//     console.log("111 USER DELETED -->", userDeleted)
//     // console.log("***", userDeleted)

//     // const userIDToDelete = userDeleted._id;
//     // console.log("==> userIDToDelete <==", userIDToDelete)

//     // // Delete all CG which have this author
//     // const spotOfUserDeletion = await Spot.deleteMany({ author: userIDToDelete })
//     // console.log("spotOfUserDeletion", spotOfUserDeletion)
// })


userSchema.post("findOneAndDelete", async function (userDeleted) {
    console.log("user that has just been deleted from mongoose query middleware", userDeleted)

    const userID = userDeleted._id.toString();

    // const stringified = userID.toString()
    // console.log("stringified ----> ", stringified)
    // console.log("type of stringified ----> ", typeof stringified)


    // Decrement visit and remove from visitors array
    const decrementVisited = await Spot.updateMany(
        { "visited.visitors": ObjectId(userID) }, // filter only docs where visited.visitors field contains the id 

        {
            $inc: { "visited.numberOfVisits": -1 }, // decrement the counter of visits
            $pull: { "visited.visitors": ObjectId(userID) } // pull the deleted user from visitor array
        }
    )




    console.log("decrementVisited", decrementVisited)

    // db.dogs.updateMany(
    //     { catFriendly: false }, // For all catFriendly that are false...
    //     { $set: { catFriendly: true, isAvailable: true } } // I will make them true and available
    // )

    // Delete all spots which have this author
    const spotOfUserDeletion = await Spot.deleteMany({ author: userID })
    console.log("spotOfUserDeletion", spotOfUserDeletion)
})


// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const User = models.User || model('User', userSchema);


// Exportation of model
export default User;


