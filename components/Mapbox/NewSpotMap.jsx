
import { useState, useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import Pin from './Pin';

import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';



const NewSpotMap = ({
    initialView, markerCoordinates,
    onEndDrag,
    onMarkerCreation
}) => {




    // Fx for Map/Marker events

    // On marker click
    const clickMapHandler = (evt) => {
        console.log('You clicked the MAP', evt)
        const { lat: Latitude, lng: Longitude } = evt.lngLat;
        const goodCoordinates = { Latitude, Longitude }
        console.log('goodCoordinates',goodCoordinates)
        // console.log('goodCoordinates', goodCoordinates)
        // onMarkerCreation(evt.lngLat)
        onMarkerCreation(goodCoordinates)
    }

    // On start dragging
    const dragStartHandler = (evt) => {
        console.log('You started dragging the marker', evt)
    }

    // While dragging
    const dragWhileHandler = (evt) => {
        console.log('You are dragging the marker', evt.lngLat)
    }


    // End dragging
    const dragStopHandler = (evt) => {
        console.log('You stopped dragging the marker', evt.lngLat)
        const { lat: Latitude, lng: Longitude } = evt.lngLat;
        const goodCoordinates = { Latitude, Longitude }
        console.log('goodCoordinates',goodCoordinates)

        onEndDrag(goodCoordinates)
    }





    return (
        <div className='flex justify-center'>
            <Map
                initialViewState={initialView}
                style={{ width: 700, height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                attributionControl={false}
                onClick={clickMapHandler}

            >


                {markerCoordinates &&
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
                        <Pin
                            size={20}
                        />
                    </Marker>
                }


                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl />

            </Map>
        </div >
    )
}

export default NewSpotMap





// <AttributionControl /> credits etc on the map, can custom it


