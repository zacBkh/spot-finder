import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { checkJWToken } from "../../../utils/APIfetchers"


const VerifyEmail = () => {

  const [status, setStatus] = useState("We're trying to verify your email");


  const router = useRouter();
  const { JWToken } = router.query
  console.log('JWToken', JWToken)

  // Invoking our utils fetcher that will call API route and passing the JWToken
  useEffect(() => {

    if (!router.isReady) return;

    const tokenChecker = async (JWToken) => {
      console.log('TOKENAAAAA', JWToken)
      const result = await checkJWToken(JWToken)
      console.log('result', result)
      setStatus(result.message)
    }


    try {
      tokenChecker(JWToken);
    } catch (error) {
      console.log('ERROOOOOR --> ', error)
    }


  }, [router.isReady])



  return (
    <>
      <h1>{status}</h1>
    </>
  )
}

export default VerifyEmail 