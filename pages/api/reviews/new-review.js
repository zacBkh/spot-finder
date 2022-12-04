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

                const reviewObject = {
                    rate: req.body.review.rate,
                    comment: req.body.review.comment,
                    reviewAuthor: req.body.reviewAuthorID,
                }

                const newReview = await Review.create(reviewObject);


                const spotToAddReview = await Spot.findByIdAndUpdate(
                    req.body.spotID,
                    { $addToSet: { reviews: newReview.id } },
                    { runValidators: true, new: true }
                );

                res.status(200).json({ success: true, result: newReview });


            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false, result: `There has been an error adding your review: ${error.message}` });
            }


        } else {
            res.status(401).json({ success: false, result: 'You are authenticated but you should not try to access this endpoint this way [add a Review]...' });
        }
    }
}