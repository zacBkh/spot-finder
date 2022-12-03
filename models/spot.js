import { Schema, model, models } from 'mongoose';
import spotCategories from '../utils/spotCategories';
import User from './user';

const spotSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minLength: 6,
        },


        description: {
            type: String, // Or convertible to a number
            required: [true, "Description is required"],
            trim: true,
            minLength: 6,
        },

        categories: {
            type: [String],
            required: [true, "Category is required"], // In Mongoose, non submitted array field will default to [] so there will always be something so this valid is useless?
            // enum: {
            //     values: ["Category", "Nature", "Urban"],
            //     message: "You need to input one or more correct categorie(s)"
            // },
            validate: [(array) => array.length !== 0,
                'Category cannot be empty'],

            validate: [(array) => array.every(el => spotCategories.includes(el)),
                'You need to input one or more correct categorie(s)'],
            // Custom valid that says, every elements in the array of cat submitted should be included in spotCategories (same than enum)

        },


        locationDrag: {
            type: Object,
            required: true,
        },



        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number], // = array of number
                required: true,
                validate: [(array) => array.length === 2, "The coordinates array must strictly contains two elements : Longitude and Latitude"]
            }
        },



        country: {
            type: String,
            required: true,
        },

        author:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        visited: {
            numberOfVisits: {
                type: Number,
                // required: true,
                default: 1
            },

            // Array of userIDs
            visitors: [{
                type: Schema.Types.ObjectId,
                ref: "User",
            }]
        },

        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
                default: []
            }
        ]

        // continent: {
        //     type: String,
        //     // required: true,
        // },


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


    }, { timestamps: true }
    //opts //passing virtual to JSON for map pop up
);





// Query Middleware --> when spot is deleted : remove the id of the deleted spot from ownerSpots

spotSchema.post("findOneAndDelete", async function (spotDeleted) {
    console.log("spot that has just been deleted from mongoose query middleware", spotDeleted)

    const spotID = spotDeleted._id.toString();


    // Remove the deleted spot from "spotsOwned" array of his author
    const removeDeletedSpot = await User.findByIdAndUpdate(
        spotDeleted.author,
        {
            $pull: { spotsOwned: spotID } // pull the deleted spot from spotsOwned array
        }
    )
})








// Model creation
// Model creation (=> a db collection called "spots" will be created => pluralized & lowercased)
const Spot = models.Spot || model('Spot', spotSchema);


// Exportation of model
export default Spot;


