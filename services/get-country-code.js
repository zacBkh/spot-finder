// Utils that get the country name

const getCountryCode = async (Longitude, Latitude) => {
    const APIEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${Longitude},${Latitude}.json?types=country&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    try {
        const response = await fetch(APIEndpoint)
        const data = await response.json()
        const countryCode = data.features[0].properties.short_code.toUpperCase()

        return countryCode
    } catch (err) {
        console.log('There has been an error in getting the country name =>', err)
    }
}

export default getCountryCode
