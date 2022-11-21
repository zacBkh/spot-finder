import { useEffect, useState } from "react"
import { useRouter } from 'next/router'


import { checkJWToken, checkUserVerified, verifyUserDB, welcomeEmailSender } from "../../../utils/APIfetchers"

// import isUserVerified from "../../../utils/Auth/isUserVerified"


// Once user reach this page JWT token in QS will be checked (1st useEffect), then userObject will be stored in state and welcome email will be sent (2nd useEffect)

const VerifyEmail = () => {





  // If user JWT verified
  // const [isUserVerified, seIsUserVerified] = useState(false);


  const [final, setFinal] = useState("We're trying to verify your email");


  const [status, setStatus] = useState(null);

  const router = useRouter();
  const { JWToken } = router.query
  console.log('JWToken', JWToken)






  // Invoking our utils fetcher that will call API route and passing the JWToken
  useEffect(() => {
    if (!router.isReady) return;

    // Fx declaration
    // Verify token and return success (boolean) - message (string) - user (object) 
    const tokenChecker = async (JWToken) => {



      // Checking for JWT authenticity
      const decoding = await checkJWToken(JWToken)
      console.log('decoding...', decoding)
      if (!decoding.success) { setStatus("JWT NOT CORRECT"); return }



      // Checking if already verified

      const isUserAlreadyVerified = await checkUserVerified(decoding.userID)
      console.log('isUserAlreadyVerified...', isUserAlreadyVerified)
      if (!isUserAlreadyVerified.success) { setStatus("could not find useer during verification process"); return } // if execution error in browsing user


      if (isUserAlreadyVerified.result === true) { setStatus("You are already verified!"); return } // user is already verified


      const verifyUserOnDB = await verifyUserDB(decoding.userID) // if not already verified veirfy it
      setStatus("Verification completed!")
      console.log('verifyUserOnDB...', verifyUserOnDB)
      const { userName } = verifyUserOnDB


      // Send wlc email and return success (boolean) - message (string)
      const resultWlc = await welcomeEmailSender(userName)
      console.log('resultWlc -->', resultWlc)
      if (!resultWlc.success) { setStatus("Could not send email"); return } // if execution error in browsing user
      setStatus("Welcome email sent!")


      // router.push("/spots/allSpots")



      return
    }

    // Fx execution
    tokenChecker(JWToken);


  }, [router.isReady])






  // useEffect(() => {

  //   // Fx declaration
  //   // Send wlc email and return success (boolean) - message (string)
  //   const wlcEmailSender = async (userName) => {

  //     // If could not validate JWT, stop execution, otherwise continue
  //     if (!isUserVerified) {
  //       return


  //     } else {
  //       const resultWlc = await welcomeEmailSender(userName)
  //       console.log('+++++++', resultWlc)
  //       setFinal(resultWlc)
  //       // router.push("/spots/allSpots")
  //     }
  //   }

  //   // Fx execution
  //   try {
  //     wlcEmailSender(final.user)

  //   } catch (error) {
  //     console.log('ERROOOOOR WELCOME EMAIL SENDER --> ', error)
  //     // put return object here
  //   }
  // }, [isUserVerified])






  return (
    <>
      <h1>{status}</h1>
    </>
  )
}

export default VerifyEmail 