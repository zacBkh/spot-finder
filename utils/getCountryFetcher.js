// Utils that get the country name

const getCountryName = async (Longitude, Latitude) => {

    console.log("FROM FETCHER", Longitude, Latitude)

    const APIEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${Longitude},${Latitude}.json?types=country&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    console.log("APIEndpoint", APIEndpoint)
    try {
        const response = await fetch(APIEndpoint)
        const data = await response.json()
        console.log("data", data)
        const country = await data.features[0].text
        console.log("country", country)

        return country
    }
    catch (err) {
        console.log("There has been an error =>", err);
    }

}

export default getCountryName





