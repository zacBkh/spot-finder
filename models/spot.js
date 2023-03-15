import { Schema, model, models } from 'mongoose'
import spotCategories from '../constants/spot-categories'
import User from './user'
import Review from './reviews'

// To enable passing of virtuals to JSON (for the map popup )

const spotSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minLength: 6,
            maxLength: 60,
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
                array => array.every(el => spotCategories.includes(el)),
                'You need to input one or more correct categorie(s)',
            ],
            // Custom valid that says, every elements in the array of cat submitted should be included in spotCategories (same than enum)
        },

        // locationDrag: {
        //     type: Object,
        //     required: true,
        // },

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
            name: { type: String, required: true },
            code: { type: String, required: true },
            region: { type: String },
            subRegion: { type: String },
            intermediateRegion: { type: String },
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        visited: {
            numberOfVisits: {
                type: Number,
                // required: true,
                default: 1,
            },

            // Array of userIDs
            visitors: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
        },

        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
                default: [],
            },
        ],

        // images: [
        //     {
        //         url: { type: String, required: true },
        //         filename: { type: String, required: true },
        //     }
        // ],

        // author:
        // {
        //     type: Schema.Types.ObjectId,
        //     ref: "Users",
        // },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
)

// Query Middleware --> when spot is deleted :
spotSchema.post('findOneAndDelete', async function (spotDeleted) {
    console.log(
        'spot that has just been deleted from mongoose query middleware',
        spotDeleted,
    )
    const spotID = spotDeleted._id.toString()

    // Remove the reviews of the deleted spot from review model
    if (spotDeleted.reviews.length) {
        const deleteRev = await Review.deleteMany({ _id: { $in: spotDeleted.reviews } })
    }

    // Remove the deleted spot from "spotsOwned" array of his author
    const removeDeletedSpot = await User.findByIdAndUpdate(spotDeleted.author, {
        $pull: { spotsOwned: spotID }, // pull the deleted spot from spotsOwned array
    })
})

spotSchema.virtual('virtuals.averageGrade').get(function () {
    // Doing average of grade
    let gradeSum = 0
    let length = 0
    for (const i of this.reviews) {
        gradeSum = gradeSum + i.rate
        length++
    }
    return gradeSum / length
})

// // If we add "query.populate(virtualName)" this will become available
// spotSchema.virtual("virtuals.averageGrade", {
//     ref: 'Review',
//     localField: 'reviews',
//     foreignField: '_id'
// });

// // return "I am a virtual"

// const numbOfReviews = this.reviews.length

// return this.reviews[0]

//     // let gradeSum = 0
//     // for (const i of this.reviews) {
//     //     gradeSum = gradeSum + i.rate
//     // }

//     // return gradeSum
//     // return gradeSum / numbOfReviews

//     // return `${this.title} ${this.description}`;
//     // let gradeSum = 0
//     // let length = 0
//     // for (const i of this.reviews) {
//     //     gradeSum = gradeSum + i.rating
//     //     length++
//     // }
//     // return gradeSum / length
// });

// Model creation
// Model creation (=> a db collection called "spots" will be created => pluralized & lowercased)
const Spot = models.Spot || model('Spot', spotSchema)

// Exportation of model
export default Spot
