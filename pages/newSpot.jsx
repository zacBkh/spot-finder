import Head from 'next/head'
import Image from 'next/image'

import NewSpotForm from "../components/NewSpotForm"





// Posting to MONGO through API routes (data coming from children, fx passed as props)
const addSpotHandler = async (enteredData) => {
  console.log("NEW SPOT DATA from parent", enteredData)

  // POSTING to MONGO
  const response = await fetch(
    "/api/new-spot",
    {
      method: "POST",
      body: JSON.stringify(enteredData), //conv to JSON
      headers: { "Content-Type": "application/json" }
    }
  )
  const data = await response.json()
  console.log("Data from Mongo", data)

  router.push("/spots/allSpots") //Navigate back to root

}







export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewSpotForm
        onAddSpot={addSpotHandler}
      />





    </div>
  )
}




