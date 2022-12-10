import SpotCard from "../components/SpotCard";
import { useState, useEffect, useContext } from "react";

import AppContext from "../context/AppContext";

import Head from "next/head"

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";

import capitalize from "../utils/capitalize";

import FilterSpots from "../components/CategoriesCheckboxes/FilterSpots";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';


import { GETSpotFetcherAll } from "../utils/GETfetchers";


import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import SelectRegion from "../components/FilterRegion/SelectRegion";


export const getServerSideProps = async (context) => {


  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  try {
    // Executing the fx that will fetch all Spots
    const resultFetchGET = await GETSpotFetcherAll()


    return {
      props: {
        spots: resultFetchGET,
        currentUserName: session ? session.user.name : null,
        queryString: context.query
      },
    };



  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    }
  }
}









const allSpots = ({ spots, currentUserName, queryString }) => {

  // Context API holding value from navbar search input + method to add
  const searchContext = useContext(AppContext)


  const [activeCategories, setActiveCategories] = useState([]);
  const [activeRegion, setActiveRegion] = useState("");

  const [filteredSpots, setFilteredSpots] = useState(spots);



  // Maintain the current activee categorie(s) array
  const handleClickFilter = (filter) => {
    console.log('filterRequired', filter)

    if (activeCategories.includes(filter)) { // if already in array -> remove

      setActiveCategories(
        (prevState) => prevState.filter(x => x !== filter)
      )
    } else { // if NOT already in array -> add
      setActiveCategories(
        (prevState) => [...prevState, filter]
      )
    }
  }




  // Filter the spots -- can be improved
  useEffect(() => {




    // If search bar only, disable all other filters
    if (searchContext.value.length) {
      setActiveCategories([]);
      setActiveRegion("")

      setFilteredSpots(spots.filter((spot) =>
        spot.title.toLowerCase().includes(searchContext.value.toLowerCase())
      ))
      return
    }





    // If categories + region --> double filter  
    if (activeCategories.length && activeRegion.length) {
      setFilteredSpots(spots
        .filter((spot) =>
          spot.categories.some(x => activeCategories.includes(x))
        )
        .filter((spot) =>
          spot.region === activeRegion
        )
      )
      return
    }





    // If categories only  
    if (activeCategories.length) {
      setFilteredSpots(spots.filter((spot) =>
        spot.categories.some(x => activeCategories.includes(x))
      ))
      return
    }


    // If region only  
    if (activeRegion.length) {
      setFilteredSpots(spots.filter((spot) =>
        spot.region === activeRegion
      ))
      return
    }

    setFilteredSpots(spots)
  }, [activeCategories, searchContext, activeRegion])





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


  // Capitalize and take only first string of current user for toaster
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


  // To get the URL param for toast
  if (queryString.alreadyLoggedIn) {
    toast.info(`${currentUserName}, you are already logged in!`, {
      position: "bottom-left",
      toastId: "alreadyLoggedIn", // prevent duplicates
    });
  }












  return (
    <>

      <Head>
        <title>Find the best spots!</title>
        <meta name="description" content="Browse the best spots, in a minute!" />
      </Head>


      <ToastContainer
        autoClose={4000}
        style={{ width: "400px" }}
      />


      {/* Global container */}
      <div className="flex mt-16 h-full justify-start space-x-12	">


        {/* Filter container */}
        <div className="flex-column border border-gray py-6 px-1	">


          {/* Category filter container */}
          <div className="flex space-x-1">
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

          <hr className="my-4 mx-auto w-4/5	 h-0.5	 bg-gray-200 border-0" />


          {/* Region filter container */}
          <SelectRegion
            regionState={activeRegion}
            onRegionFilterChange={(e) => setActiveRegion(e)}
          />


          <hr className="my-4 mx-auto w-4/5	 h-0.5	 bg-gray-200 border-0" />

        </div>









        {/* Main section with spots */}
        <div
          className=" 
                    max-w-6xl	
                    grid grid-cols-4 gap-4 justify-center">
          {
            filteredSpots
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

      </div>


    </>
  )
}

export default allSpots 