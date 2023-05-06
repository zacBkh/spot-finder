import SpotCard from '../components/spot-index-card'
import { useState, useEffect, useContext } from 'react'

import { SearchBarContext } from '../context/AppContext'

import Head from 'next/head'

import { GETSpotFetcherAll } from '../utils/GETfetchers'

import ClosedDrawer from '../components/filters-drawer/closed-drawer'
import OpenedDrawer from '../components/filters-drawer/opened-drawer'

import getAvrgGrade from '../utils/Spots/getAverageRate'

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
    return (
        <>
            <Head>
                <title>Find the best spots!</title>
                <meta name="description" content="Browse the best spots, in a minute!" />
            </Head>

            {/* Global container */}
            <div className="flex gap-x-4">
                {/* Filter category container */}
                {1 === 1 && (
                    <aside
                        className={`flex flex-col items-center border-r-[1px]  border-[#cfd9e0] py-2 sticky top-28 min-h-screen
                        w-[20%] sm:w-[7%] 
                         ${isDrawerOpen && 'w-[25%]'} transition-all`}
                    >
                        <div className="w-full cursor-pointer">
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

                        <hr className="my-4 mx-auto h-px bg-gray-200 border-0" />
                    </aside>
                )}
                <div
                    className="
                    flex flex-wrap
                    justify-center sm:justify-between
                    gap-y-5
                    gap-x-7
                    "
                >
                    {filteredSpots.map(spot => (
                        <SpotCard key={spot._id} spotData={spot} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllSpots
