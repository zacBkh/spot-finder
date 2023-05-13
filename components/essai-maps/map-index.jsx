import { useState, useRef } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

import { messageMapMAC, messageMapPC } from '../../constants/scroll-message-map'
import MapControlPanelStyles from './control-panel-styles'

import {
    Map,
    Source,
    Layer,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from 'react-map-gl'

import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers'

const MapIndex = ({ spotsCoordinates, initialView }) => {
    const mapRef = useRef(null)

    const [popupInfo, setPopupInfo] = useState(null)
    const [currentMapStyle, setCurrentMapStyle] = useState(
        'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
    )

    const onMapClickHandler = event => {
        if (!event.features.length) {
            return
        }

        const feature = event.features[0]
        let layerID

        if (feature.layer.id === 'unclustered-point') {
            const { id: layerID, author, coordinates } = feature.properties

            try {
                // GEOJSON encoding need to be converted back as JS
                feature.properties.author = JSON.parse(author)
                feature.properties.coordinates = JSON.parse(coordinates)
            } catch (error) {
                console.log('error', error)
            }

            setPopupInfo(feature.properties)
        } else {
            layerID = feature.properties.cluster_id
        }

        const mapboxSource = mapRef.current.getSource('spots')

        if (feature.layer.id === 'unclustered-point') {
            return
        }
        const clusterId = feature.properties.cluster_id
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return
            }

            mapRef.current.easeTo({
                center: feature.geometry.coordinates,
                zoom,
                duration: 500,
            })
        })
    }

    const styleChangeHandler = styleLink => {
        setCurrentMapStyle(styleLink)
    }

    console.log('popupInfo', popupInfo)
    const mapHoverHandler = event => {
        if (!event.features.length) {
            mapRef.current.getCanvas().style.cursor = 'auto'
        } else {
            mapRef.current.getCanvas().style.cursor = 'pointer'
        }
    }

    return (
        <>
            <div className={`w-full h-full`}>
                <Map
                    onMouseMove={mapHoverHandler}
                    onClick={onMapClickHandler}
                    ref={mapRef}
                    interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
                    cooperativeGestures={true}
                    initialViewState={initialView}
                    mapStyle={currentMapStyle}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    attributionControl={false}
                    minZoom={1}
                    maxZoom={17}
                    locale={{
                        'ScrollZoomBlocker.CtrlMessage': messageMapPC,
                        'ScrollZoomBlocker.CmdMessage': messageMapMAC,
                    }}
                >
                    <Source
                        id="spots"
                        type="geojson"
                        data={spotsCoordinates}
                        cluster={true}
                        clusterMaxZoom={14}
                        clusterRadius={50}
                    >
                        <Layer {...clusterLayer} />
                        <Layer {...clusterCountLayer} />
                        <Layer {...unclusteredPointLayer} />
                    </Source>

                    <FullscreenControl />
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />

                    {popupInfo && (
                        <Popup
                            closeOnClick={false}
                            closeOnMove={true}
                            onClose={() => setPopupInfo(null)}
                            className="!max-w-[200px] md:!max-w-sm 2xl:!max-w-md"
                            focusAfterOpen={false}
                            offset={23}
                            anchor="bottom"
                            longitude={popupInfo.coordinates[0]}
                            latitude={popupInfo.coordinates[1]}
                        >
                            <div className={`text-xs bg-white text-center p-2`}>
                                <p>
                                    <strong> {popupInfo.title} </strong> |{' '}
                                    {popupInfo.author.name}
                                </p>
                                {/*
                                <Link
                                    className="underline underline-offset-2"
                                    // href={`${popupInfo.name}`}
                                    href="/le-1905"
                                >
                                    En savoir plus
                                </Link> */}
                            </div>
                        </Popup>
                    )}
                    <MapControlPanelStyles
                        currentMapStyle={currentMapStyle}
                        onStyleChange={styleChangeHandler}
                    />
                </Map>
            </div>
        </>
    )
}

export default MapIndex

// <AttributionControl /> credits etc on the map, can custom it
