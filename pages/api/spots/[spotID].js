import connectMongo from '../../../utils/connectMongo';
import Spot from '../../../models/spot';

import isAuthor from '../../../utils/Auth/isAuthor';


import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"


// /api/[id]
// When this API route is hitted, execute this
export default async function APIHandler(req, res) {


    const { spotID } = req.query // query param (spot ID)
    console.log("spotID", spotID)






    // Protecting the API endpoint
    const session = await unstable_getServerSession(req, res, authOptions)


    if (!session) { // If not authenticated
        res.status(401).json({ success: false, result: 'You should be authenticated to access this endpoint [amend existing Spot]' });
        return



    } else if (!await isAuthor(spotID, session.userID)) { // if not author
        console.log("session.userID", session.userID)
        res.status(401).json({ success: false, result: 'You are not the owner of the camp [amend existing Spot]' });
        return



    } else {
        console.log("Session", JSON.stringify(session, null, 2))

        await connectMongo();


        if (req.method === "PATCH") {
            try {
                console.log('req.body', req.body); // data passed in the form
                console.log('editSApot', spotID); // id of the form to edit


                const spotToEdit = await Spot.findByIdAndUpdate(
                    spotID,
                    req.body,
                    { runValidators: true, new: true }
                );

                console.log('FOUND SPOT TO EDIT -->', spotToEdit);

                res.status(200).json({ success: true, result: spotToEdit });

            } catch (error) {
                console.log(error);
                res.status(200).json({ success: false, result: error });
            }





        } else if (req.method === "DELETE") {
            try {
                console.log('CONNECTED TO MONGO FOR EDIT !');
                console.log('Spot to delete --> ', spotID); // id of the form to DELETE


                const spotToDelete = await Spot.findByIdAndDelete(spotID);
                console.log('SPOT DELETED -->', spotToDelete);

                res.json({ SpotDeleted: spotToDelete });


            } catch (error) {
                console.log(error);
                res.json({ error });
            }
        }



        else {
            res.status(401).json({ success: false, result: 'You are authenticated but you should not try to access this endpoint this way [amend existing Spot]...' });
        }
    }
}