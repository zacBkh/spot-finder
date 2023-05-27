// These utils fx send request to my API routes for Spot & Auth

/* SC SPOTS */

// for useSwr from client side
export const findOneSpot = async spotID => {
    // POSTING to MONGO
    const response = await fetch(`/api/spots/${spotID}`, {
        method: 'GET',
    })

    return await response.json()
}

export const addSpotHandler = async enteredData => {
    console.log('NEW SPOT DATA from FETCHER', enteredData)

    // POSTING to MONGO
    const response = await fetch(`/api/spots/''`, {
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
    const response = await fetch(`/api/spots/add-a-visit/${spotID}`, {
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
    // POSTING to MONGO
    const response = await fetch(`/api/users/''`, {
        method: 'POST',
        body: JSON.stringify(enteredData), //conv to JSON
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log('Add user from API  fetcher', data)
    return data
}

// Fetch user info for profile page (useSwr client side)
export const getUserData = async userID => {
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
export const editUserHandler = async (isPwdReset, newUserData, userID) => {
    console.log('isPwdReset', isPwdReset)
    console.log('newUserData', newUserData)
    console.log('userID', userID)
    const response = await fetch(`/api/users/${userID}`, {
        method: 'PATCH',
        body: JSON.stringify({ isPwdReset, newUserData }),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    console.log('Result of USER edition', data)
    return data
}

// Subscribe visitor to newsletter
export const subscribeToNewsletter = async visitorEmail => {
    const response = await fetch('/api/users/subscribe-newsletter', {
        method: 'POST',
        body: JSON.stringify(visitorEmail),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return data
}

/* !SC */

/*SC REVIEWS */
export const addOneReview = async (spotID, review) => {
    const response = await fetch(`/api/reviews/''`, {
        method: 'POST',
        body: JSON.stringify({ spotID, review }),
        headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    console.log('result review fetcher', result)
    return result
}

export const editOneReview = async (reviewIDToEdit, review) => {
    console.log('reviewIDToEdit', reviewIDToEdit)
    console.log('review', review)
    const response = await fetch(`/api/reviews/${reviewIDToEdit}`, {
        method: 'PATCH',
        body: JSON.stringify(review),
        headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    console.log('result review edit fetcher', result)
    return result
}

export const deleteOneReview = async reviewIDToDelete => {
    const response = await fetch(`/api/reviews/${reviewIDToDelete}`, {
        method: 'DELETE',
    })
    const result = await response.json()
    console.log('result review edit fetcher', result)
    return result
}
