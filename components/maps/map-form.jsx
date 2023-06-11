import 'mapbox-gl/dist/mapbox-gl.css'

import Pin from './pin-marker'

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from 'react-map-gl'

import GeocoderControl from './geocoder-control'

import { FORM_LABEL_FS } from '../../constants/responsive-fonts'
import MapControlPanelStyles from './control-panel-styles'

import { useState } from 'react'

const MapForm = ({ shouldBeDisabled, initialView, markerCoordinates, onNewCoor }) => {
    const [currentMapStyle, setCurrentMapStyle] = useState(
        'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
    )

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

    const styleChangeHandler = styleLink => {
        setCurrentMapStyle(styleLink)
    }

    return (
        <div>
            <label className={`${FORM_LABEL_FS} text-form-color mb-2 block`}>
                Locate your Spot on the Map *
            </label>
            <div className="flex justify-center drop-shadow-lg">
                <Map
                    initialViewState={initialView}
                    style={{ width: '100%', height: '70vh', borderRadius: '10px' }}
                    // mapStyle="mapbox://styles/mapbox/satellite-streets-v12?optimize=true"
                    mapStyle={currentMapStyle}
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
                            <Pin />
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
                    <MapControlPanelStyles
                        additionalStyle={'top-[13%] sm:top-[10%]'}
                        currentMapStyle={currentMapStyle}
                        onStyleChange={styleChangeHandler}
                    />
                </Map>
            </div>
        </div>
    )
}

export default MapForm
