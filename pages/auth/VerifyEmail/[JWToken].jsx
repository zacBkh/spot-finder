import { useEffect, useState } from "react"
import { useRouter } from 'next/router'


import { checkJWToken, checkUserVerified, verifyUserDB, welcomeEmailSender } from "../../../utils/APIfetchers"

import { JWTVerifyer } from "../../../utils/APIfetchers"

// import isUserVerified from "../../../utils/Auth/isUserVerified"


// Once user reach this page JWT token in QS will be checked (1st useEffect), then userObject will be stored in state and welcome email will be sent (2nd useEffect)




// SHOULD DO THIS IN GSP ???
/* export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)



    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID
 */










const VerifyEmail = () => {



  // Display current status
  const [status, setStatus] = useState(null);

  const router = useRouter();






  // Invoking our utils fetcher that will call API route and passing the JWToken
  useEffect(() => {
    if (!router.isReady) return;

    const { JWToken } = router.query
    console.log('JWToken', JWToken)


    // Fx declaration
    // Verify token and return success (boolean) - message (string) - user (object) 
    const tokenChecker = async (JWToken) => {


      const verifyJWT = await JWTVerifyer(JWToken);
      console.log('---------- FINAL verifyJWT', verifyJWT)




      /* -------------- */

      // // Checking for JWT authenticity
      // const decoding = await checkJWToken(JWToken)
      // console.log('decoding...', decoding)
      // if (!decoding.success) { setStatus(decoding.result); return }





      // // Checking if already verified
      // const isUserAlreadyVerified = await checkUserVerified(decoding.userID)
      // console.log('isUserAlreadyVerified...', isUserAlreadyVerified)
      // if (!isUserAlreadyVerified.success) { setStatus(isUserAlreadyVerified.result); return } // if execution error in browsing user

      // if (isUserAlreadyVerified.result) { setStatus("You are already a verified user!"); return } // user is already verified

      // const verifyUserOnDB = await verifyUserDB(decoding.userID) // if not already verified veirfy it
      // setStatus(verifyUserOnDB.result)
      // const { userName } = verifyUserOnDB




      // // Send wlc email and return success (boolean) - message (string)
      // const resultWlc = await welcomeEmailSender(userName)
      // console.log('resultWlc -->', resultWlc)
      // if (!resultWlc.success) { setStatus(resultWlc.result); return } // if could not send email
      // setStatus(resultWlc.result)


      // router.push("/spots/allSpots")
    }

    // Fx execution
    tokenChecker(JWToken);


  }, [router.isReady])




  return (
    <>
      <h1>{status}</h1>
    </>
  )
}

export default VerifyEmail 