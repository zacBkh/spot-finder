import { Schema, model, models } from 'mongoose';

const spotSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
            // maxlength: 20,
        },


        description: {
            type: String, // Or convertible to a number
            required: [true, "Description is required"]

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


        // locationDrag: {
        //     type: String,
        //     required: true,
        // },



        // category: {
        //     type: [String],
        //     required: true,
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


