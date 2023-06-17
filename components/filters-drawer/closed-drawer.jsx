import { BiCategoryAlt } from 'react-icons/bi'
import { GoGlobe } from 'react-icons/go'
import { BsSortUp } from 'react-icons/bs'

import FilterIcon from '../design/filter-icon'

const ClosedDrawer = ({ onDrawerToggle, activeFilters }) => {
    const { activeCategories: cat, activeRegion: region } = activeFilters
    const styleIcons = 'p-2 border-[1px] border-[#cfd9e0] rounded-lg'

    const styleSelected =
        'text-secondary bg-secondary-light hover:bg-secondary-hov border-secondary'

    return (
        <div
            onClick={onDrawerToggle}
            className="flex flex-col items-center gap-y-8 w-full"
        >
            <button
                aria-label="Toggle filter"
                className="w-full flex justify-center items-center gap-x-3 font-semibold"
            >
                <FilterIcon />
                <span className="md:hidden">Show Filters</span>
            </button>
            <div className="hidden md:flex flex-col items-center gap-y-4">
                <button
                    aria-label="Toggle filter"
                    className={`${styleIcons} ${cat.length ? styleSelected : ''}`}
                >
                    <BiCategoryAlt className="text-xl" />
                </button>

                <button
                    aria-label="Toggle filter"
                    className={`${styleIcons} ${region.length ? styleSelected : ''}`}
                >
                    <GoGlobe className="text-xl" />
                </button>

                <button aria-label="Toggle filter" className={`${styleIcons}`}>
                    <BsSortUp className="text-xl" />
                </button>
            </div>
        </div>
    )
}

export default ClosedDrawer
