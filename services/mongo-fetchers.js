// These utils fx send request to my API routes for Spot & Auth

/* SC SPOTS */

// for useSwr from client side
export const findOneSpot = async spotID => {
    const response = await fetch(`/api/spots/${spotID}`, {
        method: 'GET',
    })

    return await response.json()
}

export const addSpotHandler = async enteredData => {
    const response = await fetch(`/api/spots/''`, {
        method: 'POST',
        body: JSON.stringify(enteredData),
        headers: { 'Content-Type': 'application/json' },
    })

    return await response.json()
}

export const editSpotHandler = async (editedEnteredData, spotID) => {
    const response = await fetch(`/api/spots/${spotID}`, {
        method: 'PATCH',
        body: JSON.stringify(editedEnteredData),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
}

export const addOneVisitSpotHandler = async (visitorID, spotID, hadVisited) => {
    const response = await fetch(`/api/spots/add-a-visit/${spotID}`, {
        method: 'PATCH',
        body: JSON.stringify({ visitorID, hadVisited }),
        headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    return result
}

export const deleteSpotHandler = async spotID => {
    const response = await fetch(`/api/spots/${spotID}`, {
        method: 'DELETE',
    })
    const data = await response.json()
}
;/ *!SC */

/* SC USERS */
// Registers a new user
export const addUserHandler = async enteredData => {
    const response = await fetch(`/api/users/''`, {
        method: 'POST',
        body: JSON.stringify(enteredData),
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    return data
}

// Fetch user info for profile page (useSwr client side)
export const getUserData = async userID => {
    const response = await fetch(`/api/users/${userID}`, {
        method: 'GET',
    })
    const data = await response.json()
    return data
}

// Delete a user
export const deleteUserHandler = async userID => {
    const response = await fetch(`/api/users/${userID}`, {
        method: 'DELETE',
    })

    const data = await response.json()
    return data
}

// Can run client side
export const checkEmailUniq = async email => {
    const response = await fetch('/api/users/emailCheckerAsync', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    return data
}

// PASSWORD RESET

// Send an email holding a JWT to reset pwd
export const sendPwdResetMail = async email => {
    console.log('sendPwdResetMail to -->', email)

    const response = await fetch('/api/users/send-link-pwd-reset', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log('Data received fromsendPwdResetMail -->', data)
    return data
}

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
    return result
}

export const editOneReview = async (reviewIDToEdit, review) => {
    const response = await fetch(`/api/reviews/${reviewIDToEdit}`, {
        method: 'PATCH',
        body: JSON.stringify(review),
        headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    return result
}

export const deleteOneReview = async reviewIDToDelete => {
    const response = await fetch(`/api/reviews/${reviewIDToDelete}`, {
        method: 'DELETE',
    })
    const result = await response.json()
    return result
}
