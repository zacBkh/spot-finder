import connectMongo from '../../utils/connectMongo';
import Spot from '../../models/spot';



// When this API route is hitted, execute this
export default async function newSpot(req, res) {

  if (req.method === 'POST') {
    try {
      await connectMongo();
      console.log('CONNECTED TO MONGO !');
      console.log("bodypayloadfrom API ROUTE", req.body)

      const newCamp = await Spot.create({
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        locationDrag: req.body.locationDrag
      }); //Will create the document + save() (that's why we await)

      console.log('CREATED DOCUMENT -->', newCamp);

      await newCamp.save()

      res.json({ newCamp });


    } catch (error) {
      console.log(error);
      res.json({ error });
    }


  } else {
    res.json({ ErrorMsg: "This page should be only POST requests, you are doing something wrong here!" });
  }
}








