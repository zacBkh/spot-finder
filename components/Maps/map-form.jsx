import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './marker'

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from 'react-map-gl'

import GeocoderControl from './geocoder-control'

const MapForm = ({ shouldBeDisabled, initialView, markerCoordinates, onNewCoor }) => {
    // On marker click
    const clickMapHandler = evt => {
        const { lat, lng } = evt.lngLat
        const goodCoordinates = [lng, lat]
        onNewCoor(goodCoordinates)
    }

    // End dragging
    const dragStopHandler = evt => {
        const { lat, lng } = evt.lngLat
        const goodCoordinates = [lng, lat]
        onNewCoor(goodCoordinates)
    }

    const getCoordinatesFromGeoCoder = geoCoderCoordinates => {
        const [Longitude, Latitude] = geoCoderCoordinates.result.center
        const goodCoordinates = [Longitude, Latitude]
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
