import { Schema, model, models } from 'mongoose'
import SPOT_CATEGORIES from '../constants/spot-categories'
import User from './user'
import Review from './reviews'

// To enable passing of virtuals to JSON (for the map popup )
const arrayOfSpotCat = SPOT_CATEGORIES.map(cat => cat.name)
const opts = {
    toJSON: { virtuals: true },
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
}

const spotSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minLength: 6,
            maxLength: 50,
        },

        description: {
            type: String, // Or convertible to a number
            required: [true, 'Description is required'],
            trim: true,
            minLength: 6,
        },

        categories: {
            type: [String],
            required: [true, 'Category is required'], // In Mongoose, non submitted array field will default to [] so there will always be something so this valid is useless?
            // enum: {
            //     values: ["Category", "Nature", "Urban"],
            //     message: "You need to input one or more correct categorie(s)"
            // },
            validate: [array => array.length !== 0, 'Category cannot be empty'],

            validate: [
                array => array.every(el => arrayOfSpotCat.includes(el)),
                'You need to input one or more correct categorie(s)',
            ],
        },

        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number], // = array of number
                required: true,
                validate: [
                    array => array.length === 2,
                    'The coordinates array must strictly contains two elements : Longitude and Latitude',
                ],
            },
        },

        country: {
            name: { type: String },
            code: { type: String },
            region: { type: String },
            subRegion: { type: String },
            intermediateRegion: { type: String },
        },

        images: {
            type: [String],
            required: [true, 'Images are required.'],
            validate: [array => array.length !== 0, 'You must submit at least one image'],
        },

        author: {
            required: [true, 'Author is required.'],
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        visitors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: [],
            },
        ],

        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
                default: [],
            },
        ],
    },
    opts,
)

// Query Middleware --> when spot is deleted :
spotSchema.post('findOneAndDelete', async function (spotDeleted) {
    console.log(
        'spot that has just been deleted from mongoose query middleware',
        spotDeleted,
    )
    const spotID = spotDeleted._id.toString()

    // Remove the deleted spot from "spotsOwned" array of his author
    const removeDeletedSpot = await User.findByIdAndUpdate(spotDeleted.author, {
        $pull: { spotsOwned: spotID }, // pull the deleted spot from spotsOwned array
    })

    // Remove the reviews of the deleted spot from review model
    if (spotDeleted.reviews.length) {
        const deleteRev = await Review.deleteMany({ _id: { $in: spotDeleted.reviews } })
    }
})

// Model creation
// Model creation (=> a db collection called "spots" will be created => pluralized & lowercased)
const Spot = models.Spot || model('Spot', spotSchema)

// Exportation of model
export default Spot
