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


        spotsOwned: [
            {
                type: Schema.Types.ObjectId,
                ref: "Spot",
                default: []
            },
        ]

    }, { timestamps: true }
);




// Query Middleware --> when user is deleted : 
// delete his ID from visited and decrement 
// remove all the spots he created

userSchema.post("findOneAndDelete", async function (userDeleted) {
    console.log("user that has just been deleted from mongoose query middleware", userDeleted)

    const userID = userDeleted._id.toString();


    // Decrement visit and remove from visitors array
    const decrementVisited = await Spot.updateMany(
        { "visited.visitors": userID }, // filter only docs where visited.visitors field contains the id 

        {
            $inc: { "visited.numberOfVisits": -1 }, // decrement the counter of visits
            $pull: { "visited.visitors": userID } // pull the deleted user from visited.visitor array
        }
    )


    // Delete all spots which have this author
    const spotOfUserDeletion = await Spot.deleteMany({ author: userID })
    console.log("spotOfUserDeletion", spotOfUserDeletion)
})


// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const User = models.User || model('User', userSchema);


// Exportation of model
export default User;


