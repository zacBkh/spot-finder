import 'mapbox-gl/dist/mapbox-gl.css'

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from 'react-map-gl'

import { messageMapMAC, messageMapPC } from '../../constants/scroll-message-map'

import Pin from './pin-marker'

import getCountryCode from '../../services/get-country-code'
import worldCountryDetails from '../../utils/world-country-continents'

const MapShow = ({ markerCoordinates, isMarkerDraggable, onSpotLocationChange }) => {
    const markerDragHandler = async coordinates => {
        const { lat, lng } = coordinates.lngLat

        const countryCode = await getCountryCode(lng, lat)

        let country
        if (countryCode === undefined) {
            country = null
        } else {
            country = worldCountryDetails.find(country => country.code === countryCode)
        }

        const geometry = {
            type: 'Point',
            coordinates: [lng, lat],
        }

        onSpotLocationChange(geometry, country)
    }

    return (
        <>
            <div className={`w-full h-full`}>
                <Map
                    cooperativeGestures={true}
                    id={markerCoordinates}
                    initialViewState={{
                        latitude: markerCoordinates.Latitude,
                        longitude: markerCoordinates.Longitude,
                        zoom: 3,
                    }}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v12?optimize=true"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    attributionControl={false}
                    minZoom={2}
                    maxZoom={18}
                    locale={{
                        'ScrollZoomBlocker.CtrlMessage': messageMapPC,
                        'ScrollZoomBlocker.CmdMessage': messageMapMAC,
                    }}
                >
                    <Marker
                        onDragEnd={markerDragHandler}
                        draggable={isMarkerDraggable}
                        longitude={markerCoordinates.Longitude}
                        latitude={markerCoordinates.Latitude}
                        color="red"
                    >
                        <Pin size={20} />
                    </Marker>

                    <FullscreenControl />
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />
                </Map>
            </div>
        </>
    )
}

export default MapShow

// <AttributionControl /> credits etc on the map, can custom it
