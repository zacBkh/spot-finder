

import 'mapbox-gl/dist/mapbox-gl.css';

import Pin from './Pin';

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    useControl
} from 'react-map-gl';




const MapShow = ({ markerCoordinates }) => {



    return (
        <div className='flex justify-center'>
            <Map
                initialViewState={{
                    latitude: markerCoordinates.Latitude,
                    longitude: markerCoordinates.Longitude,
                    zoom: 3
                }}
                style={{ width: 700, height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                attributionControl={false} >





                <Marker
                    longitude={markerCoordinates.Longitude}
                    latitude={markerCoordinates.Latitude}
                    color="red"

                >
                    <Pin
                        size={20}
                    />
                </Marker>

                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl />

            </Map>
        </div >
    )
}

export default MapShow





// <AttributionControl /> credits etc on the map, can custom it


