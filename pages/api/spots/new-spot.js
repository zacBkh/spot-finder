import connectMongo from '../../../utils/connectMongo';
import Spot from '../../../models/spot';


// End point protection
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"


// When this API route is hitted, execute this
export default async function newSpot(req, res) {


  // Protecting the endpoint
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) { // If not authenticated
    res.status(401).send({ success: false, message: "You should be authenticated to access this endpoint [create New Spot]" })
    return


  } else {
    console.log("Session", JSON.stringify(session, null, 2))


    if (req.method === 'POST') {
      try {
        await connectMongo();
        console.log('CONNECTED TO MONGO !');
        console.log("bodypayloadfrom API ROUTE", req.body)

        const newCamp = await Spot.create(req.body);
        //Will create the document + save() (that's why we await)

        console.log('CREATED DOCUMENT -->', newCamp);


        res.status(200).json({ success: true, message: newCamp });


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: `There has been an error creating your new spot:${error.message}` });
      }


    } else {
      res.status(401).send({ success: false, message: 'You are authenticated but you should not try to access this endpoint this way... [create New Spot]' })
    }
  }
}







