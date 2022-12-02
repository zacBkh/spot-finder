import connectMongo from '../../../../utils/connectMongo';
import Spot from '../../../../models/spot';

import isAuthor from '../../../../utils/Auth/isAuthor';

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"


// This route will : increment/decrement the number of visits counter and push/pull the visitorID to array


// /api/[id]
// When this API route is hitted, execute this
export default async function APIHandler(req, res) {

    const { spotID } = req.query // query param (spot ID)
    console.log("spotID", spotID)

    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)


    if (!session) { // If not authenticated
        res.status(401).json({ success: false, result: 'You should be authenticated to access this endpoint [add to Visits count]' });
        return




    } else if (await isAuthor(spotID, session.userID)) { // if the author tries to remove his own visited mark camp...
        res.status(401).json({ success: false, result: 'You are the owner of the camp, you cannot remove your visited label [add to Visits count]' });
        return





    } else { // if all OK...
        await connectMongo();


        if (req.method === "PATCH") {
            try {
                console.log('req.body', req.body); // data passed in the form
                console.log('spotToAddVisit', spotID); // id of the form to edit

                const { visitorID, hadVisited } = req.body


                let queryOptions
                if (hadVisited === true) {
                    queryOptions =
                    {
                        $inc: { "visited.numberOfVisits": -1 },
                        $pull: { "visited.visitors": visitorID }
                    }
                } else {
                    queryOptions =
                    {
                        $inc: { "visited.numberOfVisits": 1 },
                        $addToSet: { "visited.visitors": visitorID }
                    }
                }


                const spotToEdit = await Spot.findByIdAndUpdate(
                    spotID,
                    queryOptions,
                    { runValidators: true, new: true }
                );


                res.status(200).json({ success: true, result: spotToEdit });



            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false, result: `There has been an error adding a visit to the spot: ${error.message}` });
            }




        } else {
            res.status(401).json({ success: false, result: 'You are authenticated but you should not try to access this endpoint this way [add to Visits count]...' });
        }
    }
}