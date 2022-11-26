import Head from 'next/head'

import { useRouter } from 'next/router'


import BothSpotForm from '../../components/Forms/BothSpotForm'
import { addSpotHandler } from '../../utils/APIfetchers'




const Home = () => {
  const router = useRouter()



  // Will call the fetcher for ADD located in utils
  const handleAdd = async (enteredData) => {

    await addSpotHandler(enteredData)
    router.push("/spots/allSpots") //Navigate back to root
  }




  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />
      </Head>


      <div className=''>
        <BothSpotForm
          onAddOrEditFx={handleAdd}>
        </BothSpotForm>
      </div>
    </>
  )
}


export default Home


