
// These utils fx send request to my API routes for Spot & Auth


export
    const addSpotHandler = async (enteredData) => {
        console.log("NEW SPOT DATA from FETCHER", enteredData)
        console.log("TYPE OF", typeof (enteredData.locationDrag))

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
    }





export
    const editSpotHandler = async (editedEnteredData, spotID) => {
        const response = await fetch(
            `/api/${spotID}`,
            {
                method: "PATCH",
                body: JSON.stringify(editedEnteredData), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )
        const data = await response.json()
        console.log("EDITED Data from Mongo", data)
    }





export
    const deleteSpotHandler = async (spotID) => {
        const response = await fetch(
            `/api/${spotID}`,
            {
                method: "DELETE",
            }
        )
        const data = await response.json()
        console.log("DELETED Data from Mongo", data)
    }








// FOR USERS


// Registers a new user
export
    const addUserHandler = async (enteredData) => {

        console.log("NEW USER TO REGISTER", enteredData)

        // POSTING to MONGO
        const response = await fetch(
            "/api/users/register",
            {
                method: "POST",
                body: JSON.stringify(enteredData), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )


        const data = await response.json()
        console.log("data", data)
        return data // returning data for handling if mistake
    }






// Email Verification
// Call API route to check if token can be verified and if yes write in DB userVerified : true

export
    const checkJWToken = async (token) => {

        const response = await fetch(
            "/api/users/verify-email",
            {
                method: "POST",
                body: JSON.stringify(token), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("data JWT -->", data)
        return data // returning data for handling if mistake
    }
