import { useState, useRef } from 'react'

import { SlOptions } from 'react-icons/sl'

import {
    TITLE_FS,
    SMALL_TEXT_FS,
    BODY_FS,
    SMALL_TITLE_FS,
} from '../../constants/responsive-fonts'

import UserImage from '../user-image'

import DividerDesign from '../design/divider'

import SkeletonUserCard from '../skeletons/parents/user-card-skeleton'
import SkeletonText from '../skeletons/text-skeleton'
import SkeletonImage from '../skeletons/image-skeleton'

import ActionMenuUserProfile from '../action-menu-user-profile'

import UserStats from './user-stats'

import useOnClickOutside from '../../hooks/useOnClickOutside'

const hideOnLarge = 'lg:hidden'
const showOnLarge = 'hidden lg:flex flex-col sticky top-4'

import RelatedSpots from './related-spots-user'

const UserCard = ({ isLoading, visitedUser, currentUser }) => {
    const {
        name,
        spotsOwned,
        visitedSpots,
        spotsUserReviewed,
        createdAt,
        _id: visitedUserID,
    } = visitedUser

    let isCurrentUserVisitedUser = false
    if (currentUser && visitedUserID === currentUser.userID) {
        isCurrentUserVisitedUser = true
    }

    const joiningDate = new Date(createdAt).getFullYear()

    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
    const onActionClick = () => {
        setIsActionMenuOpen(prev => !prev)
    }

    const refOutsideUseActionMenu = useRef(null)

    useOnClickOutside(refOutsideUseActionMenu, () => setIsActionMenuOpen(false))

    const spotsCreated = useRef(null)
    const spotsVisited = useRef(null)
    const spotsReviewed = useRef(null)
    const scrollClickHandler = spec => {
        if (spec === 'created') {
            spotsCreated.current?.scrollIntoView({ behavior: 'smooth' })
            return
        }

        if (spec === 'visited') {
            spotsVisited.current?.scrollIntoView({ behavior: 'smooth' })
            return
        }
        if (spec === 'reviewed') {
            spotsReviewed.current?.scrollIntoView({ behavior: 'smooth' })
            return
        }
    }
    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row gap-x-14 w-[90%] xl:w-[80%] 2xl:w-[60%] mx-auto mt-3 text-form-color ">
                <div
                    className={`${showOnLarge} w-1/3 flex gap-y-6 items-center border rounded-xl border-[#DDDDDD] p-2 xl:p-4 h-fit`}
                >
                    {isLoading ? (
                        <SkeletonUserCard />
                    ) : (
                        <>
                            <UserImage noBorder width={'w-32'} height={'h-32'} />
                            <UserStats
                                onScrollClick={scrollClickHandler}
                                nbOwned={spotsOwned.length}
                                nbVisited={visitedSpots.length}
                                nbReviewed={spotsUserReviewed.length}
                            />
                        </>
                    )}
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-y-9">
                    <div className="flex justify-between items-center">
                        <div>
                            {isLoading ? (
                                <div className="flex flex-col gap-y-2">
                                    <SkeletonText type={'title'} nbOfLines={1} />
                                    <SkeletonText type={'smText'} nbOfLines={1} />
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-x-3">
                                        <h1 className={`${TITLE_FS} font-bold`}>
                                            Hi, I am {name}
                                        </h1>
                                        <button
                                            ref={refOutsideUseActionMenu}
                                            onClick={onActionClick}
                                        >
                                            <SlOptions className="text-xl" />
                                            {isActionMenuOpen && (
                                                <ActionMenuUserProfile
                                                    currentUserID={
                                                        currentUser && currentUser.userID
                                                    }
                                                    isOpen={isActionMenuOpen}
                                                    isCurrentUserVisitedUser={
                                                        isCurrentUserVisitedUser
                                                    }
                                                />
                                            )}
                                        </button>
                                    </div>
                                    <span className={`${SMALL_TEXT_FS}`}>
                                        Joined in {joiningDate}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className={`${hideOnLarge}`}>
                            {isLoading ? (
                                <SkeletonImage
                                    style={'w-20 sm:w-32 h-20 sm:h-32 rounded-full'}
                                />
                            ) : (
                                <UserImage
                                    noBorder
                                    width={'w-20 sm:w-32'}
                                    height={'h-20 sm:h-32'}
                                />
                            )}
                        </div>
                    </div>
                    <div className={`${hideOnLarge} flex flex-col gap-y-4 font-semibold`}>
                        {isLoading ? (
                            <SkeletonText
                                type={'smTitle'}
                                nbOfLines={3}
                                gap={'gap-y-5'}
                            />
                        ) : (
                            <UserStats
                                onScrollClick={scrollClickHandler}
                                nbOwned={spotsOwned.length}
                                nbVisited={visitedSpots.length}
                                nbReviewed={spotsUserReviewed.length}
                            />
                        )}
                    </div>
                    <div className="space-y-2">
                        {isLoading ? (
                            <div className="flex flex-col gap-y-5">
                                <SkeletonText
                                    type={'smTitle'}
                                    nbOfLines={1}
                                    style={'mt-3'}
                                />
                                <SkeletonText
                                    type={'text'}
                                    nbOfLines={7}
                                    fullWidth
                                    gap={'gap-y-1'}
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className={`${SMALL_TITLE_FS} font-semibold`}>
                                    About
                                </h2>
                                <p className={`${BODY_FS}`}>
                                    Hi, I am Nicola and I am lucky enough to live in one
                                    of the most beautiful areas of the Tuscan countryside
                                    near the historical town of Siena .This territory is
                                    my home,my work and my passion. With my wife and
                                    children I live on and work a farm producing
                                    traditional organic crops and also help my family
                                    preserve the beautiful castle which is our family
                                    heritage, where my Mum and Aunt still make their home
                                    and where we produce great Chianti wine and Tuscan
                                    olive oil. My family and I are hospitable people who
                                    enjoy sharing this territory we love with our guests.
                                </p>
                            </>
                        )}
                    </div>
                    <DividerDesign />
                    <RelatedSpots
                        isLoading={isLoading}
                        title={`${name}'s Spots`}
                        refClick={spotsCreated}
                        spots={spotsOwned ?? []}
                    />
                    <RelatedSpots
                        isLoading={isLoading}
                        title={`Spots ${name} visited`}
                        refClick={spotsVisited}
                        spots={visitedSpots ?? []}
                    />
                    <RelatedSpots
                        isLoading={isLoading}
                        title={`Spots ${name} reviewed`}
                        refClick={spotsReviewed}
                        spots={spotsUserReviewed ?? []}
                    />
                </div>
            </div>
        </>
    )
}

export default UserCard
