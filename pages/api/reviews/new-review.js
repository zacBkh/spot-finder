import connectMongo from '../../../utils/connectMongo';
import Review from '../../../models/reviews';
import Spot from '../../../models/spot';

// import isAuthor from '../../../../utils/Auth/isAuthor';

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]';




export default async function APIHandler(req, res) {

    console.log("req.bodybbb", req.body)
    // req.bodybbb {
    //     spotID: '638b4ed08428c079e8d84a22',
    //     reviewAuthorID: '638a29b18ac0952eafbe5e4b',   
    //     review: { comment: 'aaaaaaaaaaaa', rate: 3 }  
    //   }

    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)

    // If not authenticated
    if (!session) {
        res.status(401).json({ success: false, result: 'You should be authenticated to access this endpoint [add a Review]' });
        return



    } else { // if is authenticated OK...
        await connectMongo();


        if (req.method === "POST") {
            try {

                console.log("HELLO!!")


                const reva = {
                    rate: req.body.review.rate,
                    comment: req.body.review.comment,
                    reviewAuthor: req.body.reviewAuthorID,
                }

                const newReview = await Review.create(reva);
                console.log("newReview", newReview)


                const spotToAddReview = await Spot.findByIdAndUpdate(
                    req.body.spotID,
                    { $addToSet: { reviews: newReview.id } },
                    { runValidators: true, new: true }
                );
                console.log("spotToAddReview", spotToAddReview)


                res.status(200).json({ success: true, result: newReview });


                // const spotToEdit = await Spot.findByIdAndUpdate(
                //     spotID,
                //     queryOptions,
                //     { runValidators: true, new: true }
                // );


                // const parentCG = await CampGrounds.findById(campId); // Finding the CG
                // const newReview = new Reviews({ rating, body }) //Adding to review model
                // newReview.authorReview = req.user._id // ==> Adding the current user as author of the review
                // console.log("NEW REV ==>", newReview)
                // parentCG.reviews.push(newReview) // ==> Adding the review to the review array of the CG model




            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false, result: `There has been an error adding your review: ${error.message}` });
            }




        } else {
            res.status(401).json({ success: false, result: 'You are authenticated but you should not try to access this endpoint this way [add a Review]...' });
        }
    }
}