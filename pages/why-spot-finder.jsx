import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus } from 'react-icons/fa'

import SpotCard from '../components/spot-index-card'
import CTAButtons from '../components/buttons/cta-buttons'

import { PATHS } from '../constants/URLs'

import HIGHLIGHTED_SPOTS_LANDING_PAGE from '../constants/highlighted-spots'
import useTypeCharacters from '../hooks/useTypeCharacters'

import { BIG_TITLE_FS } from '../constants/responsive-fonts'

import Stats from '../components/why-spot-finder/stats'
import FeatureSelector from '../components/why-spot-finder/features/features-selector'

const WhySpotFinder = ({}) => {
    const arrayOfActivities = ['Photo Spots.', 'Points of Interest.', 'Strolls.']

    const { activities, currentPhase } = useTypeCharacters(arrayOfActivities)

    return (
        <div className="flex flex-col gap-y-12 md:gap-y-0">
            <section className="px-8 my-auto lg:h-[calc(100vh-(74px+16px))] flex items-center">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center md:items-start gap-y-6 w-fit md:w-[50%] text-center md:text-start z-50">
                        <div>
                            <h1 className={`${BIG_TITLE_FS} leading-[1.2] font-bold`}>
                                Discover the world&apos;s hidden gems with Spot Finder
                            </h1>
                            <h2 className="text-xl mt-4">
                                Stop wasting your time and find out <br /> about amazing{' '}
                                <span
                                    className={`text-black ${
                                        currentPhase !== 'pausing'
                                            ? 'blinkingCursorDynamic'
                                            : 'blinkingCursorPause'
                                    }`}
                                >
                                    {activities}
                                </span>
                            </h2>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-x-8 w-[90%]">
                            <CTAButtons
                                text={'Browse Spots'}
                                icon={<AiOutlineSearch />}
                                url={PATHS.HOME}
                            />
                            <CTAButtons
                                text={'Register'}
                                icon={<FaUserPlus />}
                                url={PATHS.AUTH}
                                isSecondary
                            />
                        </div>
                    </div>
                    <div className="carrouselWrapper flex-col hidden md:flex overflow-hidden mr-16">
                        <div className="flex flex-col spots-slide">
                            {HIGHLIGHTED_SPOTS_LANDING_PAGE.map(spot => (
                                <SpotCard
                                    key={spot._id}
                                    width={'w-96 sm:w-96'}
                                    height={'h-64 sm:h-64'}
                                    spotData={spot}
                                    isLandingPage
                                />
                            ))}
                        </div>

                        <div className=" hidden md:flex flex-col spots-slide">
                            {HIGHLIGHTED_SPOTS_LANDING_PAGE.map(spot => (
                                <SpotCard
                                    key={`${spot._id}#2`}
                                    width={'w-96 sm:w-96'}
                                    height={'h-64 sm:h-64'}
                                    spotData={spot}
                                    isLandingPage
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Stats />

            <FeatureSelector />
        </div>
    )
}

export default WhySpotFinder
