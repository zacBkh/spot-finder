import { useContext } from 'react'
import { SearchBarContext } from '../../../context/AppContext'

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

import { DISABLED_STYLE } from '../../../constants/disabled-style'

const SearchSpotBar = ({ disabled }) => {
    const searchContext = useContext(SearchBarContext)

    return (
        <div className="hidden sm:flex relative flex-1 justify-center items-center w-full 3xl:w-auto 3xl:shrink-0 3xl:justify-center">
            <div className="z-50 absolute left-[8%] 2xl:left-[14px] top-auto flex justify-center items-center">
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
                className={` ${DISABLED_STYLE}
                p-2 pl-10 flex 2xl:mx-0 relative pr-1 py-1 h-10 items-center text-left text-dark-color rounded-full align-middle bg-tertiary md:w-36 lg:w-48 2xl:w-56 text-xs xl:text-sm
                !outline !outline-1 !outline-offset-2 !outline-transparent
                focus:!outline-secondary
                `}
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
