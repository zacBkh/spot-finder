import { Schema, model, models } from 'mongoose';


const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            min: [0, "Rate cannot be less than 0"],
            max: [5, "Rate cannot be more than 5"],
            required: true,
        },

        body: {
            type: String,
        },


        reviewAuthor:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    }, { timestamps: true }
);






// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const Review = models.Review || model('Review', reviewSchema);


// Exportation of model
export default Review;


