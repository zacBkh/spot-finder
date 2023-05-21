import { useState } from 'react'

// This is for icon + vertical bar
const FeatureTop = ({ isActive, onFeatureChange, name, icon }) => {
    return (
        <>
            <div
                onClick={onFeatureChange}
                className={`
                    ${isActive ? 'opacity-100' : 'opacity-50'}
                    
                    hover:opacity-100
                    transition-all duration-500 ease-[cubic-bezier(0,0,.2,1)]
                    flex flex-col items-center gap-y-4 cursor-pointer
                `}
            >
                <div className="bg-secondary text-white p-5 rounded-md">{icon}</div>
                <p className=" whitespace-nowrap mb-6">{name}</p>
            </div>
        </>
    )
}

export default FeatureTop
