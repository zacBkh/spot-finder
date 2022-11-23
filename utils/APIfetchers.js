
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





export
    const credsLoginRequest = async (loginCreds) => {
        console.log("loginCreds", loginCreds)
        const response = await fetch(
            `/api/auth/callback/credentials`,
            {
                method: "POST",
            }
        )
        const data = await response.json()
        console.log("Result of credentials login", data)

        return data
        // return ({ success: true, message: "Tocard" })
    }





// rgrgrg@live.fr






















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





// DO EVERYTHING RELATED TO EMAIL VERIF

export
    const JWTVerifyer = async (token) => {

        const response = await fetch(
            "/api/users/verify-user-email",
            {
                method: "POST",
                body: JSON.stringify(token), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("verify-user-email", data)
        return data // returning data for handling if mistake on front end
    }





// ONLY decode token
export
    const checkJWToken = async (token) => {

        const response = await fetch(
            "/api/users/decode-token",
            {
                method: "POST",
                body: JSON.stringify(token), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("TOKEN DECODING", data)
        return data // returning data for handling if mistake on front end
    }



// ONLY check if user is already verified
export
    const checkUserVerified = async (userID) => {

        const response = await fetch(
            "/api/users/is-user-verified",
            {
                method: "POST",
                body: JSON.stringify(userID), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("IS VERIFIED", data)
        return data // returning data for handling if mistake on front end
    }




// Mark user as verified
export
    const verifyUserDB = async (userID) => {

        const response = await fetch(
            "/api/users/mark-user-verified",
            {
                method: "POST",
                body: JSON.stringify(userID), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("verifyUserDB -->", data)
        return data // returning data for handling if mistake on front end
    }










export
    const welcomeEmailSender = async (user) => {

        const response = await fetch(
            "/api/users/send-welcome-email",
            {
                method: "POST",
                body: JSON.stringify(user), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("data send-welcome-email -->", data)
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
        console.log("Data received from emailCheckerAsync -->", data)
        return data
    }
