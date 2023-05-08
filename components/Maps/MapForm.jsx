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

const MapForm = ({ shouldBeDisabled, initialView, markerCoordinates, onNewCoor }) => {
    // On marker click
    const clickMapHandler = evt => {
        console.log('You clicked the MAP', evt)
        const { lat, lng } = evt.lngLat
        const goodCoordinates = [lng, lat]
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
        const { lat, lng } = evt.lngLat
        const goodCoordinates = [lng, lat]
        console.log('goodCoordinates', goodCoordinates)
        onNewCoor(goodCoordinates)
    }

    const getCoordinatesFromGeoCoder = geoCoderCoordinates => {
        console.log('geoCoderCoordinates', geoCoderCoordinates)

        const [Longitude, Latitude] = geoCoderCoordinates.result.center
        console.log('Longitude & Latitude', Longitude, Latitude)
        const goodCoordinates = [Longitude, Latitude]
        console.log('goodCoordinates', goodCoordinates)
        onNewCoor(goodCoordinates)
    }

    return (
        <div className="flex justify-center">
            <Map
                initialViewState={initialView}
                style={{ width: 700, height: 500 }}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12?optimize=true"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                attributionControl={false}
                onClick={clickMapHandler}
                minZoom={3}
                maxZoom={20}
                boxZoom={!shouldBeDisabled}
                doubleClickZoom={!shouldBeDisabled}
                dragPan={!shouldBeDisabled}
                dragRotate={!shouldBeDisabled}
                scrollZoom={!shouldBeDisabled}
                keyboard={!shouldBeDisabled}
                touchPitch={!shouldBeDisabled}
                touchZoomRotate={!shouldBeDisabled}
            >
                {markerCoordinates && (
                    <Marker
                        longitude={markerCoordinates[0]}
                        latitude={markerCoordinates[1]}
                        color="red"
                        // onClick={clickMarkerHandler}
                        // onDragStart={dragStartHandler}
                        // onDrag={dragWhileHandler}
                        onDragEnd={dragStopHandler}
                        draggable={!shouldBeDisabled}
                    >
                        <Pin size={20} />
                    </Marker>
                )}

                {!shouldBeDisabled ? (
                    <GeocoderControl
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                        position="top-left"
                        essai={'1'}
                        getCoordinatesFromGeoCoder={getCoordinatesFromGeoCoder} // will extract from geocoder to here
                    />
                ) : null}

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
