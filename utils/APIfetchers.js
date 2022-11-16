
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
        console.log("Status of spot creation: ", data)
    }





export
    const editSpotHandler = async (editedEnteredData, spotID) => {
        console.log("editedEnteredDatapp", editedEnteredData)
        const response = await fetch(
            `/api/${spotID}`,
            {
                method: "PATCH",
                body: JSON.stringify(editedEnteredData), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )
        const data = await response.json()
        console.log("Result of edition", data)
    }




export
    const addOneVisitSpotHandler = async (visitorID, spotID, hadVisited) => {
        const response = await fetch(
            `/api/addVisit/${spotID}`,
            {
                method: "PATCH",
                body: JSON.stringify({ visitorID, hadVisited }), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )
        const result = await response.json()
        return result
    }






export
    const deleteSpotHandler = async (spotID) => {
        console.log("from aa", spotID)
        const response = await fetch(
            `/api/${spotID}`,
            {
                method: "DELETE",
            }
        )
        const data = await response.json()
        console.log("Result of deletion", data)
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
        return data // returning data for handling if mistake on front end
    }







// Check email uniqueness in DB for Yup async valid
export
    const checkEmailUniq = async (email) => {
        console.log("EMAIL FROM API FETCHER", email)

        const response = await fetch(
            "/api/emailCheckerAsync",
            {
                method: "POST",
                body: JSON.stringify(email),
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("data received++ -->", data)
        return data
    }
