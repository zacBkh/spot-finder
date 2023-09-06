import { useState } from 'react'
import { BsSearch, BsCamera, BsPeople, BsEmojiHeartEyes } from 'react-icons/bs'

import { useRouter } from 'next/router'

import { PATHS } from '../../../constants/URLs'
const { WHY_SPOT_FINDER } = PATHS

import FeatureTop from './features-top'
import ImageDemo from './image-demo'

import BrowseSpots from '../../../public/images/features/browse-spots.png'
import AddSpots from '../../../public/images/features/add-spots.png'
import Connect from '../../../public/images/features/connect.png'
import Discover from '../../../public/images/features/discover.png'

const FeatureSelector = ({}) => {
    const [activeFeature, setActiveFeature] = useState(0)

    const featureChangeHandler = clickedFeatureID => {
        setActiveFeature(clickedFeatureID)
    }

    const router = useRouter()

    const features = [
        {
            id: 0,
            name: 'Browse Spots',
            icon: <BsSearch />,
            text: 'Unlock access to the best Spots worldwide so you will never miss out any opportunities again.',
            image: BrowseSpots,
        },
        {
            id: 1,
            name: 'Add your Spots',
            icon: <BsCamera />,
            text: 'Let the world know about your discoveries : be generous and share your Spots!',
            image: AddSpots,
        },
        {
            id: 2,
            name: 'Connect',
            icon: <BsPeople />,
            text: 'Connect with people like you all around the world.',
            image: Connect,
        },
        {
            id: 3,
            name: 'Discover',
            icon: <BsEmojiHeartEyes />,
            text: 'Connect with people like you all around the world.',
            image: Discover,
        },
    ]

    // Controls the positionning of the bar in the line
    const getMargin = () => {
        if (activeFeature === 0) {
            return 'ml-0'
        }
        if (activeFeature === 1) {
            return 'sm:ml-[33%] md:ml-[29%] lg:ml-[31.2%] 2xl:ml-[32%]'
        }

        if (activeFeature === 2) {
            return 'sm:ml-[60%] md:ml-[57%] lg:ml-[61.3%] 2xl:ml-[63.5%]'
        }

        if (activeFeature === 3) {
            return 'sm:ml-[81%] md:ml-[77%] lg:ml-[88%] 2xl:ml-[92%]'
        }
    }

    const featChangeFromImgClickHandler = param => {
        setActiveFeature(param)
    }

    return (
        <section>
            <div className="carrouselWrapperBottom relative">
                <div
                    className={`flex flex-col items-center
                    w-[90%]  
                    mx-auto  `}
                >
                    <div
                        className={`flex justify-between items-center mt-6   
                    w-full px-4 overflow-x-auto gap-x-10 sm:gap-x-0
                    
                    ${router.pathname === WHY_SPOT_FINDER ? '' : 'mt-6'} 
                    `}
                    >
                        {features.map(feature => (
                            <FeatureTop
                                key={feature.id}
                                id={feature.id}
                                onFeatureChange={() => featureChangeHandler(feature.id)}
                                isActive={activeFeature === feature.id}
                                name={feature.name}
                                icon={feature.icon}
                            />
                        ))}
                    </div>
                    <div
                        className={`hidden sm:block w-full bg-[#3b96ba2f] overflow-hidden mb-6`}
                    >
                        <div
                            className={`px-12 h-[3px] bg-secondary rounded-full transition-all duration-500 bounceTimingFunction origin-right w-11 md:w-36 opacity-100 relative
                        ${getMargin()}
                       `}
                        ></div>
                    </div>
                    <div className="self-start mb-6">
                        <p>{features.find(feat => feat.id === activeFeature).text}</p>
                    </div>
                </div>
            </div>
            <ImageDemo
                onFeatChangeFromImgClick={featChangeFromImgClickHandler}
                activeFeature={activeFeature}
                arrayOfImages={features.map(feat => feat.image)}
            />
        </section>
    )
}

export default FeatureSelector
