import { Schema, model, models } from 'mongoose';
import spotCategories from '../utils/spotCategories';

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
            validate: [(array) => array.length === 0,
                'Category cannot be empty'],

            validate: [(array) => array.some(el => spotCategories.includes(el)),
                'You need to input one or more correct categorie(s)'], //custom valid

        },


        locationDrag: {
            type: Object,
            required: true,
        },

        // // location: {
        // //     type: String, 
        // //     // required: true,
        // // },


        // geometry: {
        //     type: {
        //         type: String,
        //         enum: ['Point'],
        //         required: true
        //     },
        //     coordinates: {
        //         type: [Number], // = array of number
        //         required: true
        //     }
        // },



        // country: {
        //     type: String,
        //     required: true,
        // },

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

        // reviews: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Reviews",
        //     }
        // ]
    },  //opts //passing virtual to JSON for map pop up
);

// Model creation
// Model creation (=> a db collection called "spots" will be created => pluralized & lowercased)
const Spot = models.Spot || model('Spot', spotSchema);


// Exportation of model
export default Spot;


