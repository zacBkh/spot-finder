import { useState, useRef } from 'react'
import Image from 'next/image'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

import 'mapbox-gl/dist/mapbox-gl.css'

import { messageMapMAC, messageMapPC } from '../../constants/scroll-message-map'
import MapControlPanelStyles from './control-panel-styles'

import { MdGrade } from 'react-icons/md'

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

import getCloudiImg from '../../utils/transform-cloudi-img'

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

    const [activeImg, setActiveImg] = useState(0)

    const arrowStyle =
        'bg-white bg-opacity-90 active:bg-opacity-100 text-[10px] md:text-sm p-1 md:p-2 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-[0.25s] absolute z-50 active:transform-none'

    const switchPicHandler = operator => {
        if (operator === '+' && activeImg < images.length - 1) {
            setActiveImg(prev => prev + 1)
            return
        }
        if (operator === '-' && activeImg > 0) {
            setActiveImg(prev => prev - 1)
        }
    }

    const getImgQueue = index => {
        if (index === activeImg) {
            return 'active'
        }
        if (index === activeImg - 1) {
            return 'prev'
        }

        if (index === activeImg + 1 || (activeImg === images.length - 1 && index === 0)) {
            return 'next'
        }

        return ''
    }

    return (
        <>
            <div className={`w-full h-full`}>
                <Map
                    onMouseMove={mapHoverHandler}
                    onMouseDown={() =>
                        (mapRef.current.getCanvas().style.cursor = 'grabbing')
                    }
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
