import SpotCard from '../components/spot-index-card'
import { useState, useEffect, useContext } from 'react'

import { SearchBarContext } from '../context/AppContext'

import Head from 'next/head'

import FilterSpots from '../components/CategoriesCheckboxes/FilterSpots'

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs'

import { GETSpotFetcherAll } from '../utils/GETfetchers'

import SelectRegion from '../components/FilterRegion/SelectRegion'
import SelectSort from '../components/Sorting/SelectSort'

import ClosedDrawer from '../components/filters-drawer/closed-drawer'
import OpenedDrawer from '../components/filters-drawer/opened-drawer'

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
        console.log('ERROR IN GETTING THEM ALL ++', error)
        return {
            notFound: true,
        }
    }
}

const AllSpots = ({ spots, queryString }) => {
    console.log('queryString', queryString)

    // Context API holding value from navbar search input + method to add
    const searchContext = useContext(SearchBarContext)

    const [activeCategories, setActiveCategories] = useState([])
    const [activeRegion, setActiveRegion] = useState('')
    const [activeSort, setActiveSort] = useState('')

    const [filteredSpots, setFilteredSpots] = useState(spots)

    // Maintain the current activee categorie(s) array
    const clickFilterHandler = filter => {
        console.log('filterRequired', filter)

        if (activeCategories.includes(filter)) {
            setActiveCategories(prevState => prevState.filter(x => x !== filter)) // if already in array -> remove
        } else {
            // if NOT already in array -> add
            setActiveCategories(prevState => [...prevState, filter])
        }
    }

    // Filter the spots -- can be improved
    // This use effect takes care of all filters except search bar
    useEffect(() => {
        // If categories + region --> double filter
        if (activeCategories.length && activeRegion.length) {
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
        if (activeRegion.length) {
            setFilteredSpots(spots.filter(spot => spot.country.region === activeRegion))
            return
        }

        if (activeSort.length) {
            switch (activeSort) {
                case 'Number of Visits':
                    setFilteredSpots(
                        [...spots].sort(
                            // .sort returns same array so we need to mutate it
                            (a, b) => b.visitors.length - a.visitors.length,
                        ),
                    )
                    break
                case 'Grade':
                    // setFilteredSpots(
                    //     [...spots].sort(
                    //         // .sort returns same array so we need to mutate it
                    //         (a, b) => b.virtuals.averageGrade - a.virtuals.averageGrade,
                    //     ),
                    // )
                    break

                case 'Oldest to newest':
                    setFilteredSpots(
                        [...spots].sort(
                            (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                        ),
                    )
                    break

                case 'Newest to oldest':
                    setFilteredSpots(
                        [...spots].sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                        ),
                    )
            }
            return
        }

        if (!searchContext.value.length) {
            setFilteredSpots(spots)
        }

        // If no filter mathced, just keep it like it is
        // setFilteredSpots(spots);

        // setFilteredSpots(spots)
    }, [activeCategories, activeRegion, activeSort, searchContext.value.length, spots])

    // If search bar only, disable all other filters
    useEffect(() => {
        if (searchContext.value.length) {
            setActiveCategories([])
            setActiveRegion('')
            setActiveSort('')

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
                         ${isDrawerOpen ? 'w-[25%]' : 'w-[7%]'} transition-all `}
                    >
                        <div className="w-full px-4">
                            {isDrawerOpen ? (
                                <OpenedDrawer
                                    activeCategories={activeCategories}
                                    onClickFilter={clickFilterHandler}
                                    onDrawerToggle={drawerToggleHandler}
                                />
                            ) : (
                                <ClosedDrawer onDrawerToggle={drawerToggleHandler} />
                            )}
                            {/* <h4 className="font-semibold text-sm mb-2">Category</h4>

                            <div className="flex flex-wrap gap-1">
                                <FilterSpots
                                    icon={<BsSunset />}
                                    value={'Sunset'}
                                    onClick={handleClickFilter}
                                    activeCategories={activeCategories}
                                />

                                <FilterSpots
                                    icon={<BsBuilding />}
                                    value={'Urban'}
                                    onClick={handleClickFilter}
                                    activeCategories={activeCategories}
                                />

                                <FilterSpots
                                    icon={<BsFillTreeFill />}
                                    value={'Nature'}
                                    onClick={handleClickFilter}
                                    activeCategories={activeCategories}
                                />
                            </div> */}
                        </div>

                        <hr className="my-4 mx-auto h-px bg-gray-200 border-0" />

                        {/* <div className="px-2">
                            <h4 className="font-semibold text-sm mb-2">Region</h4>
                            <SelectRegion
                                regionState={activeRegion}
                                onRegionFilterChange={e => setActiveRegion(e)}
                            />
                        </div> */}

                        {/* <h3 className="font-semibold text-base px-2 mt-8">Sort by...</h3>
                        <hr className="mt-2 mb-4 mx-auto h-0.5 bg-gray-200 border-0" />

                        <SelectSort
                            sortingState={activeSort}
                            onSortChange={e => setActiveSort(e)}
                        /> */}
                    </aside>
                )}
                {/* Main section with spots */}
                <div
                    className="
                        flex flex-wrap
                        justify-between
                        gap-y-5
                        gap-x-7
                    "
                >
                    {filteredSpots.map(spot => (
                        <SpotCard key={spot._id} w={'w-64'} h={'h-64'} spotData={spot} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllSpots
