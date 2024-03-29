import { useState } from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import { GETSpotFetcherAll } from '../services/fetchers-ssr'

import ToggleToMapView from '../components/toggle-to-map-view-btn'
import SpotCard from '../components/spot-index-card'

import Spinner from '../components/spinner'

export const getStaticProps = async () => {
    try {
        const resultFetchGET = await GETSpotFetcherAll()

        if (!resultFetchGET) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                spots: resultFetchGET,
            },
            revalidate: 20,
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

const DynamicMapIndex = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-dynamic-map-index' */
            '../components/maps/map-index'
        ),
    {
        ssr: false,
        loading: () => <Spinner color={'border-t-primary'} />,
    },
)

const DynamicDrawer = dynamic(
    () =>
        import(
            /* webpackChunkName: 'lazy-loaded-dynamic-side-drawer-' */
            '../components/filters-drawer/drawer-logic-wrapper'
        ),
    {
        loading: () => <Spinner color={'md:w-[8%] xl:w-[5%] border-t-primary'} />,
    },
)

const AllSpots = ({ spots }) => {
    const [activeCategories, setActiveCategories] = useState([])
    const [activeRegion, setActiveRegion] = useState('')
    const [activeSortCriteria, setactiveSortCriteria] = useState('')

    const [filteredSpots, setFilteredSpots] = useState(spots)

    const [isOnMapMode, setIsOnMapMode] = useState(false)

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleToMapViewHandler = () => {
        setIsOnMapMode(prevMapState => !prevMapState)
    }

    const initialMapCoordinates = {
        longitude: 55.18,
        latitude: 25.07,
        zoom: 2,
    }
    // These data will be available on the map
    const arrayOfSpotsGEOJSON = filteredSpots.map(spot => ({
        type: 'Feature',
        properties: {
            ...spot,
        },
        geometry: {
            type: 'Point',
            coordinates: [spot.geometry.coordinates[0], spot.geometry.coordinates[1]],
        },
    }))

    const clusterGeoJSON = {
        type: 'FeatureCollection',
        crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
        features: arrayOfSpotsGEOJSON,
    }

    const drawerToggleHandler = () => {
        setIsDrawerOpen(prev => !prev)
    }

    const handler = newArrayOfSpots => {
        setFilteredSpots(newArrayOfSpots)
    }

    return (
        <>
            <Head>
                <title>Spot Finder | Find the best spots!</title>
                <meta name="description" content="Browse the best spots, in a minute!" />

                <meta property="og:image" content="/logos/logo-no-background.png" />
            </Head>

            <div className="flex flex-col md:flex-row gap-y-4">
                <DynamicDrawer
                    onDrawerToggle={drawerToggleHandler}
                    isDrawerOpen={isDrawerOpen}
                    activeCategories={activeCategories}
                    activeRegion={activeRegion}
                    activeSortCriteria={activeSortCriteria}
                    onCatChange={newActiveCat => setActiveCategories(newActiveCat)}
                    onRegionChange={newActiveRegion => setActiveRegion(newActiveRegion)}
                    onSortCriteriaChange={newSortCriteria =>
                        setactiveSortCriteria(newSortCriteria)
                    }
                    allSpots={spots}
                    onFilteredSpotsChange={handler}
                    filteredSpots={filteredSpots}
                />

                {isOnMapMode ? (
                    <div className="w-screen h-[87vh]  ">
                        <DynamicMapIndex
                            initialView={initialMapCoordinates}
                            spotsCoordinates={clusterGeoJSON}
                        />
                    </div>
                ) : (
                    <div
                        className="flex flex-wrap
                        justify-center md:px-5
                        gap-y-5
                        gap-x-8
                        w-full
                        h-fit"
                    >
                        {filteredSpots.map(spot => (
                            <SpotCard
                                width={'w-72 sm:w-60'}
                                height={'h-72 sm:h-60'}
                                key={spot._id}
                                spotData={spot}
                            />
                        ))}
                    </div>
                )}
            </div>
            <ToggleToMapView
                isOnMapMode={isOnMapMode}
                onToggleMapView={toggleToMapViewHandler}
            />
        </>
    )
}

export default AllSpots
