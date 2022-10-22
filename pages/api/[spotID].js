import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';

// /api/[id]
// When this API route is hitted, execute this
export default async function APIHandler(req, res) {

    const { spotID } = req.query // query param (spot ID)
    await connectMongo();
    console.log('CONNECTED TO MONGO !');



    if (req.method === "PATCH") {
        try {
            console.log('req.body', req.body); // data passed in the form
            console.log('editSApot', spotID); // id of the form to edit


            const spotToEdit = await Spot.findByIdAndUpdate(
                spotID,
                {
                    title: req.body.title,
                    description: req.body.description,
                    categories: req.body.categories
                },
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



    else { res.json({ error: "unknown request" }) }
}









