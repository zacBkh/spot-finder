import SpotCard from "../components/SpotCard";
import { useState, useEffect } from "react";

import Head from "next/head"
import { useRouter } from 'next/router'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";

import capitalize from "../utils/capitalize";

import FilterSpots from "../components/CategoriesCheckboxes/FilterSpots";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';


import { GETSpotFetcherAll } from "../utils/GETfetchers";


import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import PATHS from "../utils/URLs";
const { home, newSpot } = PATHS

export const getServerSideProps = async (context) => {


  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  try {
    // Executing the fx that will fetch all Spots
    const resultFetchGET = await GETSpotFetcherAll()


    return {
      props: {
        spots: resultFetchGET,
        currentUserName: session ? session.user.name : null
      },
    };



  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    }
  }
}









const allSpots = ({ spots, currentUserName }) => {
  const [activeCategories, setActiveCategories] = useState([]);

  const [filterMode, setFilterMode] = useState(false);




  // Execute when click on filter
  const handleClickFilter = (e) => {
    const filterRequired = e.target.value
    console.log('filterRequired', filterRequired)

    if (activeCategories.includes(filterRequired)) { // if already in array -> remove
      setActiveCategories(
        (prevState) => prevState.filter(x => x !== filterRequired)
      )
    } else { // if NOT already in array -> add
      setActiveCategories(
        (prevState) => [...prevState, filterRequired]
      )
    }
  }



  // Once category state has been updated, check if there is something inside or not...
  useEffect(() => {
    if (!activeCategories.length) { //  if nothing, reset filters
      setFilterMode(false)
    } else {
      setFilterMode(true) // if at least one item, filter mode on
    }
  }, [activeCategories])





  // Toast display function
  const notifyToast = (type, text, id, icon) => {
    if (type === "default") {
      toast(text, {
        position: "bottom-left",
        toastId: id, // prevent duplicates
        icon: icon
      });

    } else {

      toast[type](text, {
        position: "bottom-left",
        toastId: id, // prevent duplicates
        icon: icon
      });
    }
  }


  // Capitalize and take only first string of current user
  if (currentUserName) { currentUserName = capitalize(currentUserName.split(" ")[0]) }


  // Display toaster
  useEffect(() => {

    const getLS = localStorage.getItem("toast");
    console.log('getLS', getLS)
    if (getLS === null) { return }


    switch (getLS) {

      case "newUser":
        notifyToast("success", `Hi ${currentUserName}, welcome to spot-finder!`, "newUser")
        break;

      case "loggedIn":
        notifyToast("success", `Hi ${currentUserName}, welcome back!`, "login")
        break;

      case "newSpot":
        notifyToast("success", "Successfully created a new spot!", "newSpot");
        break;

      case "editSpot":
        notifyToast("info", "You edited your spot successfully!", "editSpot");
        break;

      case "deleteSpot":
        notifyToast("success", "You deleted your spot successfully!", "deleteSpot");
        break;

      case "resetPwd":
        notifyToast("success", "Password changed!", "resetPwd")
        break;

      case "deleteUser":
        notifyToast("info", "You deleted your account", "newSpot", "💔");
        break;
    }
    localStorage.removeItem("toast");
  }, [])


  const router = useRouter()
  const message = router.query.alreadyLoggedIn
  // To get the URL param for toast
  useEffect(() => {
    if (message) {
      toast.info("You are already logged in!", {
        position: "bottom-left",
        toastId: "alreadyLoggedIn", // prevent duplicates
      });
    }
  }, [router.isReady])





  // ES6 filtering way
  // If filterMode is on, then filter, otherwise, just map components
  return (
    <>

      <Head>
        <title>Find the best spots</title>
        <meta name="description" content="Browse the best spots, in a minute!" />
      </Head>

      <button onClick={() => router.push(`/${newSpot}`)}> HOME</button>

      <ToastContainer
        autoClose={4000}
        style={{ width: "400px" }}
      />


      <div className="flex flex-row justify-center">
        <FilterSpots
          icon={<BsSunset />}
          value={"Sunset"}
          onClick={handleClickFilter}
          activeCategories={activeCategories}
        />

        <FilterSpots
          icon={<BsBuilding />}
          value={"Urban"}
          onClick={handleClickFilter}
          activeCategories={activeCategories}
        />

        <FilterSpots
          icon={<BsFillTreeFill />}
          value={"Nature"}
          onClick={handleClickFilter}
          activeCategories={activeCategories}
        />
      </div>



      <div
        className=" 
                    mt-14 max-w-6xl	mx-auto 
                    grid grid-cols-4 gap-4 justify-center">
        {
          filterMode ?
            spots
              .filter((spot) =>
                spot.categories.some(x => activeCategories.includes(x))
              )
              .map((spot) =>
                <SpotCard
                  key={spot._id}
                  id={spot._id}
                  title={spot.title}
                  description={spot.description}
                  categories={spot.categories}
                  author={spot.author.name}
                />
              )
            :
            spots
              .map((spot) =>
                <SpotCard
                  key={spot._id}
                  id={spot._id}
                  title={spot.title}
                  description={spot.description}
                  categories={spot.categories}
                  author={spot.author.name}
                />
              )
        }
      </div>




    </>
  )
}

export default allSpots 