import { FiChevronDown } from 'react-icons/fi'
import { FaSatellite } from 'react-icons/fa'
import { TbBulb } from 'react-icons/tb'
import { MdDarkMode } from 'react-icons/md'
import { BsBuilding, BsFillTreeFill } from 'react-icons/bs'

import { useState } from 'react'

import SortSpots from '../filters-and-sorts/sorts'

const MapControlPanelStyles = ({ onStyleChange, currentMapStyle, additionalStyle }) => {
    const mapStyles = [
        {
            link: 'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
            name: 'Satellite',
            icon: <FaSatellite />,
        },
        {
            link: 'mapbox://styles/mapbox/streets-v12?optimize=true',
            name: 'Streets',
            icon: <BsBuilding />,
        },
        {
            link: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
            name: 'Outdoors',
            icon: <BsFillTreeFill />,
        },
        {
            link: 'mapbox://styles/mapbox/light-v11?optimize=true',
            name: 'Light',
            icon: <TbBulb />,
        },
        {
            link: 'mapbox://styles/mapbox/dark-v11?optimize=true',
            name: 'Dark',
            icon: <MdDarkMode />,
        },
    ]

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0
    console.log('viewportWidth', viewportWidth)

    const [isPanelActive, setIsPanelActive] = useState(viewportWidth < 768 ? false : true)

    return (
        <>
            <div
                className={`control-panel absolute max-w-sm bg-white text-dark-color outline-none shadow-2xl py-2 px-2 m-3 flex flex-col gap-y-2 rounded-md ${additionalStyle}`}
            >
                <button
                    onClick={() => setIsPanelActive(prev => !prev)}
                    className="flex items-center gap-x-1 hover:underline font-semibold active:transform-none"
                >
                    <span className="text-xs">Change Map style</span>
                    <FiChevronDown
                        className={`ml-auto transition-transform duration-200 ease-out text-base ${
                            isPanelActive ? 'rotate-0' : 'rotate-180'
                        }`}
                    />
                </button>

                {isPanelActive ? (
                    <div className="flex flex-col gap-y-2 text-xs">
                        {mapStyles.map(style => (
                            <SortSpots
                                key={style.name}
                                onClick={() => onStyleChange(style.link)}
                                value={style.link}
                                icon={style.icon}
                                displayName={style.name}
                                activeItems={currentMapStyle}
                                smallSizeBtns
                            />
                        ))}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    )
}

export default MapControlPanelStyles
