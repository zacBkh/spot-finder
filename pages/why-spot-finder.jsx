import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus } from 'react-icons/fa'

import SpotCard from '../components/spot-index-card'
import CTAButtons from '../components/buttons/cta-buttons'

import { PATHS } from '../constants/URLs'

import HIGHLIGHTED_SPOTS_LANDING_PAGE from '../constants/highlighted-spots'

const WhySpotFinder = ({}) => {
    return (
        <>
            <section className="px-4 my-auto h-[calc(100vh-(74px+16px))] lg:h-[calc(100vh-(74px+16px))] flex items-center">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-6 w-[50%]">
                        <div>
                            <h1 className="text-5xl leading-[1.2] font-bold">
                                Discover the world&apos;s hidden gems with Spot Finder
                            </h1>
                            <h2>Stop wasting your time and find out about amazing ...</h2>
                        </div>
                        <div className="flex items-center gap-x-8 w-[90%]">
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
                    <div className="logos flex flex-col overflow-hidden">
                        <div className="flex flex-col logos-slide">
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

                        <div className="flex flex-col logos-slide">
                            {HIGHLIGHTED_SPOTS_LANDING_PAGE.map(spot => (
                                <SpotCard
                                    key={`${spot._id}`}
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
        </>
    )
}

export default WhySpotFinder
