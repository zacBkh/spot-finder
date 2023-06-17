import { useContext } from 'react'
import { SearchBarContext } from '../../../context/AppContext'

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

import { DISABLED_STYLE } from '../../../constants/disabled-style'

const SearchSpotBar = ({ disabled }) => {
    const searchContext = useContext(SearchBarContext)

    return (
        <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineSearch className=" text-gray-400 text-lg" />
                <span className="sr-only">Search icon</span>
            </div>

            <input
                title={disabled ? 'Visit the main page to search for Spots.' : undefined}
                disabled={disabled}
                value={searchContext.value}
                onChange={e => searchContext.addSearch(e.target.value)}
                type="text"
                id="search-navbar"
                placeholder="Search a Spot..."
                className={`${DISABLED_STYLE} focus:ring-white focus:border-secondary border-[1.6px] border-[#bbb8bd]
                text-dark-color text-xs md:text-sm block md:w-36 lg:w-48 p-2 pl-10 rounded-md`}
            />

            {searchContext.value.length > 0 ? (
                <button
                    aria-label="Delete searched text"
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    <AiOutlineClose
                        onMouseDown={e => e.preventDefault()} // prevent focus
                        onClick={() => searchContext.addSearch('')}
                        className="text-lg text-gray-400"
                    />
                </button>
            ) : (
                ''
            )}
        </div>
    )
}

export default SearchSpotBar
