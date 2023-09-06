import Counter from './counter-stat'
import UserCardSmall from '../user-card-small'

import HIGHLIGHTED_USERS_LANDING_PAGE from '../../constants/highlighted-users'

import useTypeCharacters from '../../hooks/useTypeCharacters'

const Stats = ({ refStats, isStatInView }) => {
    const arrayOfActivities = [
        'Photographers.',
        'Adventure seekers.',
        'Travel lovers.',
        'Curious humans.',
    ]

    const { activities, currentPhase } = useTypeCharacters(arrayOfActivities)

    return (
        <section className="flex justify-center md:justify-between items-center gap-x-12 bg-tertiary z-10 relative carrouselWrapperBottom px-2 sm:px-6 text-center md:text-start ">
            <div className="carrouselWrapper max-w-[50%] flex-col hidden md:flex">
                <div className="flex flex-col spots-slide">
                    {HIGHLIGHTED_USERS_LANDING_PAGE.map(user => (
                        <UserCardSmall
                            key={user._id}
                            userID={user._id}
                            name={user.name}
                            picLink={user.profilePic.link}
                            country={user.country}
                            joiningDate={user.joiningDate}
                            description={user.description}
                            nbSpotsOwned={user.nbSpotsOwned}
                        />
                    ))}
                </div>

                <div className="flex flex-col spots-slide">
                    {HIGHLIGHTED_USERS_LANDING_PAGE.map(user => (
                        <UserCardSmall
                            key={user._id}
                            userID={user._id}
                            name={user.name}
                            picLink={user.profilePic.link}
                            country={user.country}
                            joiningDate={user.joiningDate}
                            description={user.description}
                            nbSpotsOwned={user.nbSpotsOwned}
                        />
                    ))}
                </div>
            </div>
            <div ref={refStats} className="flex flex-col w-auto md:w-1/2 gap-y-6">
                <div>
                    <h2 className={`text-3xl md:text-4xl font-bold !leading-[3.2rem]`}>
                        Join a global community of <br />{' '}
                        <mark
                            className={`bg-primary text-white px-2 ${
                                currentPhase !== 'pausing'
                                    ? 'blinkingCursorDynamic'
                                    : 'blinkingCursorPause'
                            }`}
                        >
                            {activities}
                        </mark>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start">
                    <Counter
                        isStatInView={isStatInView}
                        endNum={15}
                        text={'Spots shared worldwide'}
                    />
                    <Counter
                        isStatInView={isStatInView}
                        endNum={18}
                        text={'active users'}
                    />

                    <Counter
                        isStatInView={isStatInView}
                        endNum={11}
                        text={'countries represented'}
                    />
                    <Counter
                        isStatInView={isStatInView}
                        endNum={22}
                        text={'reviews posted'}
                    />
                </div>
            </div>
        </section>
    )
}

export default Stats
