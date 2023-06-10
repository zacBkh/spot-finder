import { Schema, model, models } from 'mongoose'
import Spot from './spot'
const reviewSchema = new Schema(
    {
        rate: {
            type: Number,
            min: [0, 'Rate cannot be less than 0'],
            max: [5, 'Rate cannot be more than 5'],
            required: true,
        },

        comment: {
            type: String,
        },

        reviewAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        reviewedSpot: {
            type: Schema.Types.ObjectId,
            ref: 'Spot',
        },
    },
    { timestamps: true },
)

// Query Middleware --> when review is deleted :
reviewSchema.post('findOneAndDelete', async function (reviewDeleted) {
    const reviewID = reviewDeleted._id.toString()

    // Remove the deleted review from the spots model
    const removeDeletedReviewFromSpotModel = await Spot.findByIdAndUpdate(
        reviewDeleted.reviewedSpot,
        {
            $pull: { reviews: reviewID }, // pull the deleted spot from spotsOwned array
        },
    )
})

// Model creation
// Model creation (=> a db collection called "users" will be created => pluralized & lowercased)
const Review = models.Review || model('Review', reviewSchema)

// Exportation of model
export default Review
