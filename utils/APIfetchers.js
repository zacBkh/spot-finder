// These utils fx send request to my API routes


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




export
    const addSpotHandler = async (enteredData) => {
        console.log("NEW SPOT DATA from parent", enteredData)

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
