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

const MapIndex = ({ spotsCoordinates, initialView }) => {
    const mapRef = useRef(null)
    const [popupInfo, setPopupInfo] = useState(null)
    const { images, coordinates, title, author, reviews } = popupInfo ?? {}
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
                const spotClicked = spotsCoordinates.features.find(
                    spot => spot.properties.id === clickedSpotID,
                )
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
                            className=" md:!max-w-sm 2xl:!max-w-md  "
                            focusAfterOpen={false}
                            offset={6}
                            longitude={coordinates[0]}
                            latitude={coordinates[1]}
                        >
                            <div
                                className={`text-xs bg-white text-center md:pb-4
                                font-['Open_Sans']  md:w-fit !rounded-full 
                            `}
                            >
                                <div className="flex md:flex-col  items-start ">
                                    <div
                                        className="!max-w-full md:!max-w-sm 2xl:!max-w-md  
                                        w-52 h-32 md:w-72 md:h-44
                                        relative group whitespace-nowrap  "
                                    >
                                        <button
                                            onClick={() => switchPicHandler('-')}
                                            className={`
                                            ${activeImg === 0 && 'invisible'}
                                            alignBtnCarrPopUpLeft
                                            ${arrowStyle}
                                            `}
                                        >
                                            <IoIosArrowBack />
                                        </button>
                                        {images.map((img, index) => (
                                            <Image
                                                key={img}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="Picture of a Spot"
                                                src={getCloudiImg('', img)}
                                                className={`${getImgQueue(
                                                    index,
                                                )} transition-transform duration-[400ms] rounded-tl-xl rounded-bl-xl md:rounded-tl-xl  md:rounded-tr-xl  md:rounded-bl-none `}
                                                // placeholder="blur"
                                                // blurDataURL={getCloudiImg(undefined, images[0])}
                                            />
                                        ))}

                                        <button
                                            onClick={() => switchPicHandler('+')}
                                            className={`
                                            ${
                                                activeImg === images.length - 1 &&
                                                'invisible'
                                            }
                                            alignBtnCarrPopUpRight
                                            ${arrowStyle}
                                            `}
                                        >
                                            <IoIosArrowForward />
                                        </button>
                                    </div>

                                    <div className="p-3 w-1/2 md:w-full flex flex-col sm:flex-row justify-between  gap-y-2 md:gap-y-0 text-start">
                                        <p className="md:whitespace-nowrap overflow-hidden text-ellipsis">
                                            <strong> {title}</strong>,{' '}
                                            <span className="block md:inline font-light">
                                                {' '}
                                                by {author.name}.
                                            </span>
                                        </p>

                                        <div className="flex items-center align-top gap-x-1">
                                            <MdGrade className="w-4 h-4" />
                                            <span>{reviews.avrgGrade}</span>
                                        </div>
                                    </div>
                                </div>
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
