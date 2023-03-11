// Utils that get the country name

const getCountryName = async (Longitude, Latitude) => {
    console.log('FROM getCountryName', Longitude, Latitude)

    const APIEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${Longitude},${Latitude}.json?types=country&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    console.log('APIEndpoint', APIEndpoint)
    try {
        const response = await fetch(APIEndpoint)
        const data = await response.json()
        const countryName = data.features[0].text
        const countryCode = data.features[0].properties.short_code.toUpperCase()

        console.log('return from getCountryName', countryName, countryCode)
        return { countryName, countryCode }
    } catch (err) {
        console.log('There has been an error in getting the country name =>', err)
    }
}

export default getCountryName
