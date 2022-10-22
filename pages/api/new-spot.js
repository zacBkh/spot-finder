import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';



// When this API route is hitted, execute this
export default async function newSpot(req, res) {

  try {
    await connectMongo();
    console.log('CONNECTED TO MONGO !');
    console.log("bodypayloadfrom API ROUTE", req.body)

    const newCamp = await Spot.create({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
    }); //Will create the document + save() (that's why we await)

    console.log('CREATED DOCUMENT -->', newCamp);

    await newCamp.save()

    res.json({ newCamp });


  } catch (error) {
    console.log(error);
    res.json({ error });
  }

}








