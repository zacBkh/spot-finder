import { Schema, model, models } from 'mongoose';

import Spot from './spot';
import Review from './reviews';

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



    // Delete all review in the review model the user let 
    const revDeletion = await Review.deleteMany({ reviewAuthor: userID })





    // https://mongoosejs.com/docs/populate.html#populate-middleware:~:text=books.%24*.author%27)%3B-,Populate%20in%20Middleware,-You%20can%20populate


    // Delete the old referenced reviews from spot.reviews array of objectIDs
    // 
    // const revDeletionInSpot = await Spot.updateMany(
    //     { reviews: userID },
    //     {
    //         $pull: { spotsOwned: spotID } // pull the deleted spot from spotsOwned array
    //     }
    // )
})



// .populate("reviews")

// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const User = models.User || model('User', userSchema);


// Exportation of model
export default User;


