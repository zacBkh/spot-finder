import { useEffect, useState } from "react"
import { useRouter } from 'next/router'


import { checkJWToken } from "../../../utils/APIfetchers"
import { welcomeEmailSender } from "../../../utils/APIfetchers"


// Once user reach this page JWT token in QS will be checked (1st useEffect), then userObject will be stored in state and welcome email will be sent (2nd useEffect)

const VerifyEmail = () => {





  // If user JWT verified
  const [isUserVerified, seIsUserVerified] = useState(false);


  const [final, setFinal] = useState("We're trying to verify your email");

  const router = useRouter();
  const { JWToken } = router.query
  console.log('JWToken', JWToken)






  // Invoking our utils fetcher that will call API route and passing the JWToken
  useEffect(() => {
    if (!router.isReady) return;

    // Fx declaration
    // Verify token and return success (boolean) - message (string) - user (object) 
    const tokenChecker = async (JWToken) => {
      const result = await checkJWToken(JWToken)
      setFinal(result)
      if (result.success) { seIsUserVerified(true) }
    }

    // Fx execution
    try {
      tokenChecker(JWToken);

    } catch (error) {
      // put return object here
    }
  }, [router.isReady])






  useEffect(() => {

    // Fx declaration
    // Send wlc email and return success (boolean) - message (string)
    const wlcEmailSender = async (userName) => {

      // If could not validate JWT, stop execution, otherwise continue
      if (!isUserVerified) {
        return

      } else {
        const resultWlc = await welcomeEmailSender(userName)
        console.log('+++++++', resultWlc)
        setFinal(resultWlc)
        // router.push("/spots/allSpots")
      }
    }

    // Fx execution
    try {
      wlcEmailSender(final.user)

    } catch (error) {
      console.log('ERROOOOOR WELCOME EMAIL SENDER --> ', error)
      // put return object here
    }
  }, [isUserVerified])






  return (
    <>
      <h1>{final.message}</h1>
    </>
  )
}

export default VerifyEmail 