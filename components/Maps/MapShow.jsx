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
    const [isMapLoading, setIsMapLoading] = useState(true)
    const [aaa, setAAA] = useState(false)

    const onLoad = arg => {
        setIsMapLoading(arg.fullyLoaded)
    }

    return (
        <>
            <div className={`justify-center mt-6 ${isMapLoading ? 'flex' : 'hidden'}`}>
                <h3>Map Loading...</h3>
            </div>

            <div className={`justify-center mt-6 ${isMapLoading ? 'invisible' : 'flex'}`}>
                <Map
                    initialViewState={{
                        latitude: markerCoordinates.Latitude,
                        longitude: markerCoordinates.Longitude,
                        zoom: 3,
                    }}
                    style={{ width: 700, height: 500 }}
                    // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                    mapStyle="mapbox://styles/zacharie123dxb/clcnu76zp000514pf3jx9c20g"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    attributionControl={false}
                    // onLoad={() => setIsMapLoading(false)}
                    onLoad={onLoad}
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
