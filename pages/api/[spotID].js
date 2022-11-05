import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';



import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"


// /api/[id]
// When this API route is hitted, execute this
export default async function APIHandler(req, res) {

    // Protecting the endpoint
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) { // If not authenticated
        res.status(401).send("You should be authenticated to access this endpoint [amend existing Spot]")
        return

    } else {
        console.log("Session", JSON.stringify(session, null, 2))

        const { spotID } = req.query // query param (spot ID)
        await connectMongo();
        console.log('CONNECTED TO MONGO !');



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

                res.json({ SpotEdited: spotToEdit });


            } catch (error) {
                console.log(error);
                res.json({ error });
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



        else { res.status(401).send('You are authenticated but you should not try to access this endpoint this way [amend existing Spot]...') }
    }
}
