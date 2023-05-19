import SpotCard from '../components/spot-index-card'
import { useState, useEffect, useContext } from 'react'

import { SearchBarContext } from '../context/AppContext'

import Head from 'next/head'

import { GETSpotFetcherAll } from '../services/fetchers-ssr'

import ClosedDrawer from '../components/filters-drawer/closed-drawer'
import OpenedDrawer from '../components/filters-drawer/opened-drawer'

import getAvrgGrade from '../utils/get-average-rate'

import MapIndex from '../components/maps/map-index'

import ToggleToMapView from '../components/toggle-to-map-view-btn'

export const getServerSideProps = async context => {
    try {
        // Executing the fx that will fetch all Spots
        const resultFetchGET = await GETSpotFetcherAll()

        if (!resultFetchGET) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                spots: resultFetchGET,

                queryString: context.query,
            },
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

const AllSpots = ({ spots }) => {
    // Context API holding value from navbar search input + method to add
    const searchContext = useContext(SearchBarContext)

    const [activeCategories, setActiveCategories] = useState([])
    const [activeRegion, setActiveRegion] = useState('')
    const [activeSortCriteria, setactiveSortCriteria] = useState('')

    const [filteredSpots, setFilteredSpots] = useState(spots)

    const [isOnMapMode, setIsOnMapMode] = useState(false)
    const toggleToMapViewHandler = () => {
        setIsOnMapMode(prevMapState => !prevMapState)
    }

    // Maintain the current activee categorie(s) array
    const catFilterHandler = filteredCat => {
        if (activeCategories.includes(filteredCat)) {
            setActiveCategories(prevState => prevState.filter(x => x !== filteredCat)) // if already in array -> remove
        } else {
            // if NOT already in array -> add
            setActiveCategories(prevState => [...prevState, filteredCat])
        }
    }

    const regionFilterHandler = filteredRegion => {
        if (activeRegion === filteredRegion) {
            setActiveRegion('')
        } else {
            setActiveRegion(filteredRegion)
        }
    }

    const addSortHandler = sortingCriteria => {
        if (activeSortCriteria === sortingCriteria) {
            setactiveSortCriteria('')
        } else {
            setactiveSortCriteria(sortingCriteria)
        }
    }

    // Handles cat & region filters
    useEffect(() => {
        // If categories + region --> double filter
        if (activeCategories.length && activeRegion) {
            setFilteredSpots(
                spots
                    .filter(spot =>
                        spot.categories.some(x => activeCategories.includes(x)),
                    )
                    .filter(spot => spot.country.region === activeRegion),
            )
            return
        }

        // If categories only
        if (activeCategories.length) {
            setFilteredSpots(
                spots.filter(spot =>
                    spot.categories.some(x => activeCategories.includes(x)),
                ),
            )
            return
        }

        // If region only
        if (activeRegion) {
            setFilteredSpots(spots.filter(spot => spot.country.region === activeRegion))
            return
        }

        if (
            !activeCategories.length &&
            !activeRegion.length &&
            !searchContext.value.length
        ) {
            setFilteredSpots(spots)
        }
    }, [activeCategories, activeRegion, searchContext.value.length, spots])

    useEffect(() => {
        if (activeSortCriteria) {
            switch (activeSortCriteria) {
                case 'Number of visits':
                    setFilteredSpots(
                        [...filteredSpots].sort(
                            // .sort returns same array so we need to mutate it
                            (a, b) => b.visitors.length - a.visitors.length,
                        ),
                    )
                    break
                case 'Grade':
                    setFilteredSpots(
                        [...filteredSpots].sort(
                            (a, b) => getAvrgGrade(b.reviews) - getAvrgGrade(a.reviews),
                        ),
                    )
                    break

                case 'Recent':
                    setFilteredSpots(
                        [...filteredSpots].sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                        ),
                    )
                    break
            }
            return
        }

        if (!activeSortCriteria) {
            setFilteredSpots(spots)
        }
    }, [activeSortCriteria])

    // If search bar only, disable all other filters
    useEffect(() => {
        if (searchContext.value.length) {
            setActiveCategories([])
            setActiveRegion('')
            setactiveSortCriteria('')

            setFilteredSpots(
                spots.filter(spot =>
                    spot.title.toLowerCase().includes(searchContext.value.toLowerCase()),
                ),
            )
            return
        }

        setFilteredSpots(spots)
    }, [searchContext.value.length, searchContext.value, spots])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const drawerToggleHandler = () => {
        setIsDrawerOpen(prev => !prev)
    }

    const initialMapCoordinates = {
        longitude: 55.18,
        latitude: 25.07,
        zoom: 2,
    }

    const arrayOfSpotsGEOJSON = filteredSpots.map(spot => ({
        type: 'Feature',
        properties: {
            id: spot._id,
            title: spot.title,
            author: spot.author,
            coordinates: spot.geometry.coordinates,
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

    return (
        <>
            <Head>
                <title>Find the best spots!</title>
                <meta name="description" content="Browse the best spots, in a minute!" />
            </Head>

            <div className="flex flex-col md:flex-row gap-x-4 gap-y-3">
                <aside
                    className={`${
                        isDrawerOpen ? 'md:w-[30%] 2xl:w-[20%]' : 'md:w-[8%] xl:w-[5%]'
                    } w-full transition-all
                    flex flex-col items-center border-r-[1px] border-[#cfd9e0] py-2 md:sticky md:top-28  px-1`}
                >
                    <div className="w-full">
                        {isDrawerOpen ? (
                            <OpenedDrawer
                                activeCategories={activeCategories}
                                activeRegion={activeRegion}
                                onClickFilterCat={catFilterHandler}
                                onClickFilterRegion={regionFilterHandler}
                                onAddSort={addSortHandler}
                                activeCriteria={activeSortCriteria}
                                onDrawerToggle={drawerToggleHandler}
                            />
                        ) : (
                            <ClosedDrawer onDrawerToggle={drawerToggleHandler} />
                        )}
                    </div>
                </aside>
                {isOnMapMode ? (
                    <div className="w-screen h-[80vh]  ">
                        <MapIndex
                            initialView={initialMapCoordinates}
                            spotsCoordinates={clusterGeoJSON}
                        />
                    </div>
                ) : (
                    <div
                        className="flex flex-wrap
                        justify-center md:justify-start
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
