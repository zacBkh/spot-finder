import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';



// When this API route is hitted, execute this
export default async function newSpot(req, res) {

  try {
    await connectMongo();
    console.log('CONNECTED TO MONGO !');

    const newCamp = await Spot.create(req.body); //Will create the document + save() (that's why we await)

    console.log('CREATED DOCUMENT -->', newCamp);

    res.json({ newCamp });


  } catch (error) {
    console.log(error);
    res.json({ error });
  }

}








