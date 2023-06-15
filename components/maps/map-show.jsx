import { useState, useEffect } from 'react'
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

import MapControlPanelStyles from './control-panel-styles'

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

    const [currentMapStyle, setCurrentMapStyle] = useState(
        'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
    )

    const [isStyleLoaded, setIsStyleLoaded] = useState(true)

    const styleChangeHandler = styleLink => {
        setIsStyleLoaded(false) // otherwise <Marker/> throw error due to being rendered before style change
        setCurrentMapStyle(styleLink)
    }

    return (
        <div className={`w-full h-full`}>
            <Map
                onIdle={() => setIsStyleLoaded(true)}
                cooperativeGestures={true}
                id={markerCoordinates}
                initialViewState={{
                    latitude: markerCoordinates.Latitude,
                    longitude: markerCoordinates.Longitude,
                    zoom: 3,
                }}
                mapStyle={currentMapStyle}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                attributionControl={false}
                minZoom={2}
                maxZoom={18}
                locale={{
                    'ScrollZoomBlocker.CtrlMessage': messageMapPC,
                    'ScrollZoomBlocker.CmdMessage': messageMapMAC,
                }}
            >
                {isStyleLoaded && (
                    <Marker
                        onDragEnd={markerDragHandler}
                        draggable={isMarkerDraggable}
                        longitude={markerCoordinates.Longitude}
                        latitude={markerCoordinates.Latitude}
                        color="red"
                    >
                        <Pin />
                    </Marker>
                )}
                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl />
                <MapControlPanelStyles
                    additionalStyle={'top-[0%]'}
                    currentMapStyle={currentMapStyle}
                    onStyleChange={styleChangeHandler}
                />
            </Map>
        </div>
    )
}

export default MapShow

// <AttributionControl /> credits etc on the map, can custom it
