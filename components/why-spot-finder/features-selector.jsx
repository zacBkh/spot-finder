import { useState } from 'react'
import { BsSearch, BsCamera, BsPeople } from 'react-icons/bs'

import { useRouter } from 'next/router'

import { PATHS } from '../../constants/URLs'
const { WHY_SPOT_FINDER } = PATHS

const FeatureSelector = ({}) => {
    const router = useRouter()

    const features = [
        {
            name: 'Browse Spots',
            icon: <BsSearch />,
            text: 'Unlock access to the best Spots worldwide so you will never miss out any opportunities again.',
        },
        {
            name: 'Add your Spots',
            icon: <BsCamera />,
            text: 'Let the world know about your discoveries : be generous and share your Spots!',
        },
        {
            name: 'Connect',
            icon: <BsPeople />,
            text: 'Connect with people like you all around the world.',
        },
    ]

    const componentDisplay = (
        <>
            {' '}
            <div className="flex flex-col items-center"></div>
        </>
    )

    return (
        <>
            <div
                className={`flex justify-between items-center px-12 mt-6
            ${
                router.pathname === WHY_SPOT_FINDER ? 'carrouselWrapperBottom' : 'mt-6'
            } relative
             `}
            >
                {features.map(feature => (
                    <div key={feature.name} className="flex flex-col items-center">
                        <div>{feature.icon}</div>
                        <p>{feature.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FeatureSelector
