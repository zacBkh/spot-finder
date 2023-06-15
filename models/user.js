import { Schema, model, models } from 'mongoose'

import Spot from './spot'
import Review from './reviews'
import Account from './account'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
        },

        description: {
            type: String,
            trim: true,
        },

        country: {
            name: { type: String, required: true },
            code: { type: String, required: true },
        },

        profilePic: {
            isCustom: { type: Boolean, required: true },
            link: { type: String, required: true },
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

        providerName: {
            type: String,
        },

        spotsOwned: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Spot',
                },
            ],
            default: [], // Default value as an empty array
        },

        createdAtOAuth: {
            type: Date,
        },
    },
    { timestamps: true },
)

// Query Middleware --> when user is deleted :
// delete his ID from visited and decrement
// remove all the spots he created

userSchema.post('findOneAndDelete', async function (userDeleted) {
    const userID = userDeleted._id.toString()

    // Remove from visitors array
    const decrementVisited = await Spot.updateMany(
        { visitors: userID }, // filter only docs where visitors field includes the id

        {
            $pull: { visitors: userID }, // pull the deleted user from visitor array
        },
    )

    // Delete all spots which have this author
    const spotOfUserDeletion = await Spot.deleteMany({ author: userID })

    // Delete reviews from Spot model, in reviews field
    const revToDelete = await Review.find({ reviewAuthor: userID }).select('id') // find all reviews need to be deleted
    const revToDeleteArray = revToDelete.map(rev => rev._id) // put them in an array
    // $pull from reviews array in Spot model
    const revDeletionInSpotModel = await Spot.updateMany(
        { reviews: { $in: revToDeleteArray } }, // for all documents whose reviews field is included in revToDeleteArray
        { $pull: { reviews: { $in: revToDeleteArray } } },
    )

    // Delete reviews from review model
    const revDeletion = await Review.deleteMany({ reviewAuthor: userID })

    // Delete document from accounts model

    if (userDeleted.provider === 'credentials') {
        return
    }
    const delAcc = await Account.findOneAndDelete({ userId: userID })
})

// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const User = models.User || model('User', userSchema)

// Exportation of model
export default User
