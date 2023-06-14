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

import SpotCard from '../spot-index-card'

const MapIndex = ({ spotsCoordinates, initialView }) => {
    const mapRef = useRef(null)
    const [popupInfo, setPopupInfo] = useState(null)
    const { images, geometry, title, author, reviews } = popupInfo ?? {}
    const [currentMapStyle, setCurrentMapStyle] = useState(
        'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
    )

    const onMapClickHandler = event => {
        if (!event.features.length) {
            return
        }

        let layerID
        const feature = event.features[0]

        if (feature.layer.id === 'unclustered-point') {
            try {
                const clickedSpotID = feature.properties.id
                console.log('clickedSpotID', clickedSpotID)
                console.log('spotsCoordinates', spotsCoordinates)
                const spotClicked = spotsCoordinates.features.find(
                    spot => spot.properties._id == clickedSpotID,
                )
                console.log('spotClicked', spotClicked)
                setPopupInfo(spotClicked.properties)
                console.log('popupInfo', popupInfo)
            } catch (error) {
                console.log('error', error)
            }
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

    const mapHoverHandler = event => {
        try {
            if (!event.features.length) {
                mapRef.current.getCanvas().style.cursor = 'grab'
            } else {
                mapRef.current.getCanvas().style.cursor = 'pointer'
            }
        } catch (err) {
            return
        }
    }

    return (
        <div className={`w-full h-full`}>
            <Map
                onMouseMove={mapHoverHandler}
                onMouseDown={() => (mapRef.current.getCanvas().style.cursor = 'grabbing')}
                onMouseUp={() => (mapRef.current.getCanvas().style.cursor = 'grab')}
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
                        // anchor="left"
                        closeOnClick={false}
                        closeOnMove={true}
                        onClose={() => setPopupInfo(null)}
                        className=" md:!max-w-sm 2xl:!max-w-md   "
                        focusAfterOpen={false}
                        offset={6}
                        longitude={geometry.coordinates[0]}
                        latitude={geometry.coordinates[1]}
                    >
                        <SpotCard
                            width={'w-48 sm:w-52'}
                            height={'h-48 sm:h-52'}
                            spotData={popupInfo}
                            moreStyleContainer={'!p-2'}
                            // spotTitleFS={'text-sm'}
                            // spotOtherFS={'text-xs'}
                            userImgSize={'w-8 h-8'}
                            isMapPopUp
                        />
                    </Popup>
                )}
                <MapControlPanelStyles
                    additionalStyle={'top-[0%]'}
                    currentMapStyle={currentMapStyle}
                    onStyleChange={styleChangeHandler}
                />
            </Map>
        </div>
    )
}

export default MapIndex

// <AttributionControl /> credits etc on the map, can custom it
