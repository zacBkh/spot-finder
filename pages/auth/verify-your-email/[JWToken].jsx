import { useState } from "react"

import JWTVerifyer from "../../../utils/JWTMailToken/JWTVerifyer"




// Get Server Side Props
export const getServerSideProps = async (context) => {

  const { JWToken } = context.params
  const emailVerifResult = await JWTVerifyer(JWToken)
  console.log('emailVerifResult', emailVerifResult)

  return {
    props: {
      emailVerifResult
    },
  };
}






// Component
const VerifyEmail = ({ emailVerifResult }) => {

  // Display current status
  const [status, setStatus] = useState(emailVerifResult.result);




  return (
    <>
      <h1>{status}</h1>
    </>
  )
}

export default VerifyEmail 