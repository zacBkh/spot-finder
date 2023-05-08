import 'mapbox-gl/dist/mapbox-gl.css'

import Map, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    useControl,
} from 'react-map-gl'

const MapIndex = ({ initialView }) => {
    return (
        <>
            <div className={`w-full h-full`}>
                <Map
                    cooperativeGestures={true}
                    // id={markerCoordinates}
                    initialViewState={initialView}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v12?optimize=true"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    attributionControl={false}
                    onZoom={e => console.log(e.viewState.zoom)}
                    minZoom={1}
                    maxZoom={17}
                    locale={{
                        'ScrollZoomBlocker.CtrlMessage':
                            'Use CTRL + Scroll to zoom the map',
                        'ScrollZoomBlocker.CmdMessage': 'Use ⌘ + Scroll to zoom the map',
                    }}
                >
                    <FullscreenControl />
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />
                </Map>
            </div>
        </>
    )
}

export default MapIndex

// <AttributionControl /> credits etc on the map, can custom it
