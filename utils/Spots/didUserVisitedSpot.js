

// check if passed spot has been visited by passed user

const didUserVisited = (spotVisitorsIDs, currentUserID) => {
    const didVisit = spotVisitorsIDs.includes(currentUserID)
    return didVisit ? true : false
}

export default didUserVisited