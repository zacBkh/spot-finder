import { BiCategoryAlt } from 'react-icons/bi'
import { GoGlobe } from 'react-icons/go'
import { FaGlobeEurope } from 'react-icons/fa'
import { BsSortUp } from 'react-icons/bs'

import FilterIcon from '../design/filter-icon'
import DividerDesign from '../design/divider'

import SPOT_CATEGORIES from '../../constants/spot-categories'
import SPOT_REGIONS from '../../constants/spot-regions'
import SORTING_CRITERIAS from '../../constants/sorting-criterias'

import FilterSpots from '../filters-and-sorts/filters'
import SortSpots from '../filters-and-sorts/sorts'

const OpenedDrawer = ({
    activeCategories,
    onClickFilterCat,

    activeRegion,
    onClickFilterRegion,

    onAddSort,
    activeCriteria,

    onDrawerToggle,
}) => {
    return (
        <div onClick={onDrawerToggle} className="flex flex-col items-center gap-y-4">
            <button className="w-full flex items-center justify-center gap-x-3 font-semibold">
                <FilterIcon />
                <p>Hide Filters</p>
            </button>
            <DividerDesign />

            <div className="flex flex-col gap-y-8 transition-filters">
                <div className="flex flex-col items-start gap-y-2 font-bold">
                    <div className="flex items-center gap-x-2">
                        <BiCategoryAlt />
                        <p className="text-sm">Categories</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {SPOT_CATEGORIES.map(category => (
                            <FilterSpots
                                onClick={onClickFilterCat}
                                key={category.name}
                                icon={category.icon}
                                value={category.name}
                                activeItems={activeCategories}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-y-2 font-bold">
                    <div className="flex items-center gap-x-2">
                        <GoGlobe />
                        <p className="text-sm">Region</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {SPOT_REGIONS.map(region => (
                            <FilterSpots
                                onClick={onClickFilterRegion}
                                key={region.name}
                                icon={<FaGlobeEurope />}
                                value={region.name}
                                activeItems={activeRegion}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-y-2 font-bold">
                    <div className="flex items-center gap-x-2">
                        <BsSortUp />
                        <p className="text-sm">Sort by</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {SORTING_CRITERIAS.map(criteria => (
                            <SortSpots
                                onClick={onAddSort}
                                key={criteria.name}
                                icon={criteria.icon}
                                value={criteria.name}
                                activeItems={activeCriteria}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenedDrawer
