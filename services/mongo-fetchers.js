// These utils fx send request to my API routes for Spot & Auth

/* SC SPOTS */
export const addSpotHandler = async enteredData => {
    console.log('NEW SPOT DATA from FETCHER', enteredData)
    console.log('TYPE OF', typeof enteredData.locationDrag)

    // POSTING to MONGO
    const response = await fetch('/api/spots/new-spot', {
        method: 'POST',
        body: JSON.stringify(enteredData), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })

    return await response.json()
}

export const editSpotHandler = async (editedEnteredData, spotID) => {
    console.log('editedEnteredDatapp', editedEnteredData)
    const response = await fetch(`/api/spots/${spotID}`, {
        method: 'PATCH',
        body: JSON.stringify(editedEnteredData), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    console.log('Result of edition', data)
}

export const addOneVisitSpotHandler = async (visitorID, spotID, hadVisited) => {
    const response = await fetch(`/api/spots/addVisit/${spotID}`, {
        method: 'PATCH',
        body: JSON.stringify({ visitorID, hadVisited }), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    return result
}

export const deleteSpotHandler = async spotID => {
    console.log('from aa', spotID)
    const response = await fetch(`/api/spots/${spotID}`, {
        method: 'DELETE',
    })
    const data = await response.json()
    console.log('Result of deletion', data)
}
;/ *!SC */

/* SC USERS */
// Registers a new user
export const addUserHandler = async enteredData => {
    console.log('NEW USER TO REGISTER', enteredData)

    // POSTING to MONGO
    const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(enteredData), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log('Add user from API  fetcher', data)
    return data
}

// Fetch user info for profile page
export const getUserData = async userID => {
    console.log('GET USER DATA', userID)

    const response = await fetch(`/api/users/${userID}`, {
        method: 'GET',
    })

    const data = await response.json()
    console.log('Accessed user from API route', data)
    return data
}

// Delete a user
export const deleteUserHandler = async userID => {
    console.log('USER TO DELETE', userID)
    console.log('TYPEEE', typeof userID)

    // POSTING to MONGO
    const response = await fetch(`/api/users/${userID}`, {
        method: 'DELETE',
    })

    const data = await response.json()
    console.log('Delete user from API fetcher', data)
    return data
}

// Can run client side
export const checkEmailUniq = async email => {
    console.log('EMAIL FROM API FETCHER', email)

    const response = await fetch('/api/users/emailCheckerAsync', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log('Data received from emailCheckerAsync -->', data)
    return data
}

// PASSWORD RESET

// Send an email holding a JWT to reset pwd
export const sendPwdResetMail = async email => {
    console.log('sendPwdResetMail -->', email)

    const response = await fetch('/api/users/send-link-pwd-reset', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log('Data received fromsendPwdResetMail -->', data)
    return data
}

// Change PWD in DB ONLY FOR NOW CHANGE PWD
export const editUserHandler = async (newPwd, userID) => {
    console.log('userID', userID)
    console.log('newPwd', newPwd)
    const response = await fetch(`/api/users/${userID}`, {
        method: 'PATCH',
        body: JSON.stringify(newPwd), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    console.log('Result of USER edition', data)
    return data
}

// Get spots of a user
export const getThisUserSpots = async enteredData => {
    // POSTING to MONGO
    const response = await fetch('/api/users/register', {
        method: 'GET',
    })
    const data = await response.json()
    return data
}
;/ *!SC */

/*SC REVIEWS */
export const addOneReview = async (spotID, reviewAuthorID, review) => {
    const response = await fetch(`/api/reviews/new-review`, {
        method: 'POST',
        body: JSON.stringify({ spotID, reviewAuthorID, review }), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    return result
}

/* !SC */
