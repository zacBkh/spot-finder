import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './Pin'

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from 'react-map-gl'

import GeocoderControl from './GeocoderControl.tsx'

// markerCoordinates is Latitude and Longitude

const MapForm = ({ shouldBeDisabled, initialView, markerCoordinates, onNewCoor }) => {
    // On marker click
    const clickMapHandler = evt => {
        console.log('You clicked the MAP', evt)
        const { lat: Latitude, lng: Longitude } = evt.lngLat
        const goodCoordinates = { Latitude, Longitude }
        console.log('goodCoordinates', goodCoordinates)
        // console.log('goodCoordinates', goodCoordinates)
        onNewCoor(goodCoordinates)
    }

    // // On start dragging
    // const dragStartHandler = (evt) => {
    //     console.log('You started dragging the marker', evt)
    // }

    // // While dragging
    // const dragWhileHandler = (evt) => {
    //     console.log('You are dragging the marker', evt.lngLat)
    // }

    // End dragging
    const dragStopHandler = evt => {
        console.log('You stopped dragging the marker', evt.lngLat)
        const { lat: Latitude, lng: Longitude } = evt.lngLat
        const goodCoordinates = { Latitude, Longitude }
        console.log('goodCoordinates', goodCoordinates)
        onNewCoor(goodCoordinates)
    }

    const getCoordinatesFromGeoCoder = geoCoderCoordinates => {
        console.log('geoCoderCoordinates', geoCoderCoordinates)

        console.log('LONGITUDE', geoCoderCoordinates.result.center[0])
        console.log('LATITUDE', geoCoderCoordinates.result.center[1])

        const [Longitude, Latitude] = geoCoderCoordinates.result.center
        console.log('Longitude & Latitude', Longitude, Latitude)
        const goodCoordinates = { Latitude, Longitude }
        console.log('goodCoordinates', goodCoordinates)

        onNewCoor(goodCoordinates)
    }

    return (
        <div className="flex justify-center">
            <Map
                initialViewState={initialView}
                style={{ width: 700, height: 500 }}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                attributionControl={false}
                onClick={clickMapHandler}
                interactive={!shouldBeDisabled}
            >
                {markerCoordinates && (
                    <Marker
                        longitude={markerCoordinates.Longitude}
                        latitude={markerCoordinates.Latitude}
                        color="red"
                        draggable
                        // onClick={clickMarkerHandler}
                        // onDragStart={dragStartHandler}
                        // onDrag={dragWhileHandler}
                        onDragEnd={dragStopHandler}
                    >
                        <Pin size={20} />
                    </Marker>
                )}

                <GeocoderControl
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    position="top-left"
                    essai={'1'}
                    getCoordinatesFromGeoCoder={getCoordinatesFromGeoCoder} // will extract from geocoder to here
                />

                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl />
            </Map>
        </div>
    )
}

export default MapForm

// <AttributionControl /> credits etc on the map, can custom it
