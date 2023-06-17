import { useEffect, useContext } from 'react'

import OpenedDrawer from './opened-drawer'
import ClosedDrawer from './closed-drawer'

import { SearchBarContext } from '../../context/AppContext'

import getAvrgGrade from '../../utils/get-average-rate'

const SideDrawerFilters = ({
    onDrawerToggle,
    isDrawerOpen,

    activeCategories,
    activeRegion,
    activeSortCriteria,

    onCatChange,
    onRegionChange,
    onSortCriteriaChange,

    allSpots,
    onFilteredSpotsChange,
    filteredSpots,
}) => {
    // Context API holding value from navbar search input + method to add
    const searchContext = useContext(SearchBarContext)

    // Maintain the current activee categorie(s) array
    const catFilterHandler = filteredCat => {
        if (activeCategories.includes(filteredCat)) {
            onCatChange(activeCategories.filter(x => x !== filteredCat)) // if already in array -> remove
        } else {
            // if NOT already in array -> add
            onCatChange([...activeCategories, filteredCat])
        }
    }

    const regionFilterHandler = filteredRegion => {
        if (activeRegion === filteredRegion) {
            onRegionChange('')
        } else {
            onRegionChange(filteredRegion)
        }
    }

    const addSortHandler = sortingCriteria => {
        if (activeSortCriteria === sortingCriteria) {
            onSortCriteriaChange('')
        } else {
            onSortCriteriaChange(sortingCriteria)
        }
    }

    // Handles cat & region filters
    useEffect(() => {
        // If categories + region --> double filter
        if (activeCategories.length && activeRegion) {
            onFilteredSpotsChange(
                allSpots
                    .filter(spot =>
                        spot.categories.some(x => activeCategories.includes(x)),
                    )
                    .filter(spot => spot.country.region === activeRegion),
            )
            return
        }

        // If categories only
        if (activeCategories.length) {
            onFilteredSpotsChange(
                allSpots.filter(spot =>
                    spot.categories.some(x => activeCategories.includes(x)),
                ),
            )
            return
        }

        // If region only
        if (activeRegion) {
            onFilteredSpotsChange(
                allSpots.filter(spot => spot.country.region === activeRegion),
            )
            return
        }

        if (
            !activeCategories.length &&
            !activeRegion.length &&
            !searchContext.value.length
        ) {
            onFilteredSpotsChange(allSpots)
        }
    }, [activeCategories, activeRegion, searchContext.value.length, allSpots])

    // Handles criteria sorting change
    useEffect(() => {
        if (activeSortCriteria) {
            switch (activeSortCriteria) {
                case 'Number of visits':
                    onFilteredSpotsChange(
                        [...filteredSpots].sort(
                            // .sort returns same array so we need to mutate it
                            (a, b) => b.visitors.length - a.visitors.length,
                        ),
                    )
                    break
                case 'Grade':
                    onFilteredSpotsChange(
                        [...filteredSpots].sort(
                            (a, b) => getAvrgGrade(b.reviews) - getAvrgGrade(a.reviews),
                        ),
                    )
                    break

                case 'Recent':
                    onFilteredSpotsChange(
                        [...filteredSpots].sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                        ),
                    )
                    break
            }
            return
        }

        if (!activeSortCriteria) {
            onSortCriteriaChange('')
        }
    }, [activeSortCriteria])

    // If search bar only, disable all other filters
    useEffect(() => {
        if (searchContext.value.length) {
            onCatChange([])
            onRegionChange('')
            onSortCriteriaChange('')

            onFilteredSpotsChange(
                allSpots.filter(spot =>
                    spot.title.toLowerCase().includes(searchContext.value.toLowerCase()),
                ),
            )
            return
        }

        onFilteredSpotsChange(filteredSpots)
    }, [searchContext.value.length, searchContext.value, allSpots])

    return (
        <>
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
                            onDrawerToggle={() => onDrawerToggle()}
                        />
                    ) : (
                        <ClosedDrawer
                            activeFilters={{ activeCategories, activeRegion }}
                            onDrawerToggle={() => onDrawerToggle()}
                        />
                    )}
                </div>
            </aside>
        </>
    )
}

export default SideDrawerFilters
