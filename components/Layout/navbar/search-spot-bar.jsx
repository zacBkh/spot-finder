import { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

import DISABLED_STYLE from '../../../constants/disabled-style'

const SearchSpotBar = ({ disabled }) => {
    const searchContext = useContext(AppContext)

    return (
        <div className=" 0/10 relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineSearch className=" text-gray-400 text-lg " />
                <span className="sr-only">Search icon</span>
            </div>

            <input
                title={disabled && 'Visit the main page to search for Spots.'}
                disabled={disabled}
                value={searchContext.value}
                onChange={e => searchContext.addSearch(e.target.value)}
                type="text"
                id="search-navbar"
                placeholder="Search a Spot..."
                className={`${DISABLED_STYLE} focus:ring-white focus:border-white border-0
                text-white text-sm block w-full p-2 pl-10 rounded-lg bg-gray-700`}
            />

            {searchContext.value.length > 0 ? (
                <button
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
