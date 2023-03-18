import { useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './Pin'

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    useControl,
} from 'react-map-gl'

const MapShow = ({ markerCoordinates }) => {
    // Will tell to parent the map finished loading

    return (
        <>
            <div className={`w-full h-full`}>
                <Map
                    // boxZoom={false}
                    cooperativeGestures={true}
                    secrollZoom={false}
                    id={markerCoordinates}
                    initialViewState={{
                        latitude: markerCoordinates.Latitude,
                        longitude: markerCoordinates.Longitude,
                        zoom: 7,
                    }}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v12?optimize=true"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    attributionControl={false}
                    onZoom={e => console.log(e.viewState.zoom)}
                    minZoom={10}
                    maxZoom={18}
                >
                    <Marker
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
