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
import Head from 'next/head'

import { useInView } from 'react-intersection-observer'

const WhySpotFinder = ({}) => {
    const arrayOfActivities = [
        'Photo Spots.',
        'Points of Interest.',
        'Unknown locations.',
    ]

    const { activities, currentPhase } = useTypeCharacters(arrayOfActivities)

    const options = {
        triggerOnce: true,
        threshold: 0.75, // 10% of the element visible to trigger
    }

    const [refStats, isStatInView] = useInView(options)

    return (
        <>
            <Head>
                <title>Why Spot Finder?</title>
                <meta
                    name="description"
                    content="Why have we created SpotFinder and how it can change your photographer/traveler experience?"
                />
            </Head>

            <div className="flex flex-col gap-y-12 md:gap-y-0">
                <section className="px-8 2xl:px-12 my-auto lg:h-[calc(100vh-(74px+16px))] flex items-center">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center md:items-start gap-y-6 w-fit md:w-[50%] text-center md:text-start z-50">
                            <div>
                                <h1 className={`${BIG_TITLE_FS} font-bold`}>
                                    Discover the world&apos;s hidden gems with Spot Finder
                                    📸
                                </h1>
                                <h2 className="text-xl mt-4">
                                    Stop wasting your time and find out{' '}
                                    <br className="hidden md:inline" /> about amazing{' '}
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
                        <div className="carrouselWrapper flex-col hidden md:flex overflow-hidden mr-8 lg:mr-16 2xl:mr-24">
                            <div className="flex flex-col spots-slide">
                                {HIGHLIGHTED_SPOTS_LANDING_PAGE.map(spot => (
                                    <SpotCard
                                        key={spot._id}
                                        width={'md:w-72 lg:w-96 2xl:w-[484px]'}
                                        height={'md:h-72 lg:h-64'}
                                        spotData={spot}
                                        isLandingPage
                                    />
                                ))}
                            </div>

                            <div className=" hidden md:flex flex-col spots-slide">
                                {HIGHLIGHTED_SPOTS_LANDING_PAGE.map(spot => (
                                    <SpotCard
                                        key={`${spot._id}#2`}
                                        width={'md:w-72 lg:w-96 2xl:w-[484px]'}
                                        height={'md:h-72 lg:h-64'}
                                        spotData={spot}
                                        isLandingPage
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Stats isStatInView={isStatInView} refStats={refStats} />

                <FeatureSelector />
            </div>
        </>
    )
}

export default WhySpotFinder
