import connectMongo from '../../../utils/connectMongo';

import User from '../../../models/user';

import { hash } from 'bcryptjs';

// import { unstable_getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"


// RIGHT NOW ONLY WORKING FOR PASSWORD CHANGE

// Edit some user data including pwd
// Receive payload (req.body = new userDATA) and userID in URL (req.query) 
export default async function editUserData(req, res) {

    console.log('req.body -->', req.body);

    const { userID } = req.query
    console.log("userID -->", userID)


    await connectMongo();


    // If does not find user
    const userExist = await User.findById(userID)
    if (!userExist) {
        return res.status(400).json({ success: false, result: "User does not exist" });
    }



    if (req.method === "PATCH") {
        try {

            //Hash password
            const hashedPassword = await hash(req.body, 12)
            console.log("hashedPassword", hashedPassword)

            const userEdition = await User.findByIdAndUpdate(
                userID,
                { password: hashedPassword },
                { runValidators: true, new: true }
            );

            console.log('USER TO EDIT -->', userEdition);

            res.status(200).json({ UserEdited: userEdition });


        } catch (error) {
            console.log(error);
            res.status(400).json({ success: false, result: error });
        }





    } else if (req.method === "DELETE") {
        // try {

        console.log("WANT TO DELETE USER")

        //     console.log('CONNECTED TO MONGO FOR EDIT !');
        //     console.log('Spot to delete --> ', spotID); // id of the form to DELETE


        //     const spotToDelete = await Spot.findByIdAndDelete(spotID);
        //     console.log('SPOT DELETED -->', spotToDelete);

        //     res.json({ SpotDeleted: spotToDelete });


        // } catch (error) {
        //     console.log(error);
        //     res.json({ error });
        // }




    } else {
        res.status(401).json({ success: false, message: 'You are authorized but you should not try to access this endpoint this way [amend existing User]...' });
    }

}