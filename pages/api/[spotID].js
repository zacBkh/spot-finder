import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';



// When this API route is hitted, execute this
export default async function editSpot(req, res) {

    const { spotID } = req.query // will show query param
    await connectMongo();
    console.log('CONNECTED TO MONGO !');


    if (req.method === "PATCH") {
        try {
            console.log('req.body', req.body); // data passed in the form
            console.log('editSApot', spotID); // id of the form to edit


            const spotToEdit = await Spot.findByIdAndUpdate(
                spotID,
                { title: req.body.title, description: req.body.description },
                { runValidators: true, new: true }

            ); //Will create the document + save() (that's why we await)

            console.log('FOUND SPOT TO EDIT -->', spotToEdit);

            res.json({ hello: "blabla" });


        } catch (error) {
            console.log(error);
            res.json({ error });
        }





    } else if (req.method === "DELETE") {

        try {
            console.log('CONNECTED TO MONGO FOR EDIT !');
            console.log('Spot to delete --> ', spotID); // id of the form to DELETE


            const spotToEdit = await Spot.findByIdAndDelete(spotID);
            console.log('SPOT DELETED -->', spotToEdit);

            res.json({ hello: "blabla" });


        } catch (error) {
            console.log(error);
            res.json({ error });
        }



    }









}







// const response = await Spot.findById(id)


