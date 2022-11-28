
// These utils fx send request to my API routes for Spot & Auth


export
    const addSpotHandler = async (enteredData) => {
        console.log("NEW SPOT DATA from FETCHER", enteredData)
        console.log("TYPE OF", typeof (enteredData.locationDrag))

        // POSTING to MONGO
        const response = await fetch(
            "/api/spots/new-spot",
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
            `/api/spots/${spotID}`,
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
            `/api/spots/addVisit/${spotID}`,
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
            `/api/spots/${spotID}`,
            {
                method: "DELETE",
            }
        )
        const data = await response.json()
        console.log("Result of deletion", data)
    }




// To be logged in after registration
// export
//     const credsLoginRequest = async (loginCreds) => {
//         console.log("loginCreds", loginCreds)
//         const response = await fetch(
//             `/api/auth/callback/credentials`,
//             {
//                 method: "POST",
//             }
//         )
//         const data = await response.json()
//         console.log("Result of credentials login", data)

//         return data
//         // return ({ success: true, message: "Tocard" })
//     }









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





// Check email uniqueness in DB for Yup async valid
export
    const checkEmailUniq = async (email) => {
        console.log("EMAIL FROM API FETCHER", email)

        const response = await fetch(
            "/api/users/emailCheckerAsync",
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







// PASSWORD RESET

// Send an email holding a JWT to reset pwd
export
    const sendPwdResetMail = async (email) => {
        console.log("sendPwdResetMail -->", email)

        const response = await fetch(
            "/api/users/send-pwdReset-link",
            {
                method: "POST",
                body: JSON.stringify(email),
                headers: { "Content-Type": "application/json" }
            }
        )

        const data = await response.json()
        console.log("Data received fromsendPwdResetMail -->", data)
        return data
    }

// Change PWD in DB
export
    const editUserHandler = async (editedEnteredData, userID) => {
        console.log("userID", userID)
        console.log("editedEnteredDatUser", editedEnteredData)
        const response = await fetch(
            `/api/users/${userID}`,
            {
                method: "PATCH",
                body: JSON.stringify(editedEnteredData), //conv to JSON
                headers: { "Content-Type": "application/json" }
            }
        )
        const data = await response.json()
        console.log("Result of USER edition", data)
        return data
    }
