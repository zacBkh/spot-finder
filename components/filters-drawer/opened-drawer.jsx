import { BiCategoryAlt } from 'react-icons/bi'
import { GoGlobe } from 'react-icons/go'

import FilterIcon from '../design/filter-icon'
import DividerDesign from '../design/divider'

import SPOT_CATEGORIES from '../../constants/spot-categories'
import FilterSpots from '../CategoriesCheckboxes/FilterSpots'
const OpenedDrawer = ({ activeCategories, onClickFilter, onDrawerToggle }) => {
    return (
        <div className="flex flex-col items-start gap-y-4">
            <button
                onClick={onDrawerToggle}
                className="w-full flex items-center gap-x-2 font-semibold"
            >
                <FilterIcon />
                <p>Filters</p>
            </button>
            <DividerDesign />
            <div className="flex flex-col items-start gap-y-2 font-bold">
                <div className="flex items-center gap-x-2">
                    <BiCategoryAlt />
                    <p className="text-sm">Categories</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {SPOT_CATEGORIES.map(category => (
                        <FilterSpots
                            onClick={onClickFilter}
                            key={category.name}
                            icon={category.icon}
                            value={category.name}
                            activeCategories={activeCategories}
                        />
                    ))}
                </div>
            </div>
            <div>
                <GoGlobe />
                <p>Region</p>
            </div>
        </div>
    )
}

export default OpenedDrawer
