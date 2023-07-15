import { useState, useRef } from 'react'

import { SlOptions } from 'react-icons/sl'

import { useRouter } from 'next/router'

import { TITLE_FS, SMALL_TEXT_FS, SMALL_TITLE_FS } from '../../constants/responsive-fonts'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const {
    KEY,
    VALUE_RESET_PWD_EMAIL_SENT_SUCCESS,
    VALUE_RESET_PWD_EMAIL_SENT_FAILURE,
    VALUE_EDIT_DESC_SUCCESS,
    VALUE_EDIT_DESC_FAILURE,
} = TOAST_PARAMS

import UserImage from '../user-image'

import DividerDesign from '../design/divider'

import SkeletonUserCard from '../skeletons/parents/user-card-skeleton'
import SkeletonText from '../skeletons/text-skeleton'
import SkeletonImage from '../skeletons/image-skeleton'

import ActionMenuUserProfile from '../action-menu-user-profile'

import UserStats from './user-stats'

import useOnClickOutside from '../../hooks/useOnClickOutside'

const hideOnLarge = 'lg:hidden'
const showOnLarge = 'hidden lg:flex flex-col sticky top-20'

import RelatedSpots from './related-spots-user'

import { sendPwdResetMail } from '../../services/mongo-fetchers'

import CountryDisplayer from '../country-displayer'
import UserDescription from './user-description'

const UserCard = ({ isLoading, visitedUser, currentUser }) => {
    const router = useRouter()

    const {
        name,
        spotsOwned,
        visitedSpots,
        spotsUserReviewed,
        createdAt,
        country: countryOfOrigin,
        description,
        _id: visitedUserID,
        profilePic,
    } = visitedUser

    const provider = visitedUser.provider

    let isCurrentUserVisitedUser = false
    if (currentUser && visitedUserID === currentUser.userID) {
        isCurrentUserVisitedUser = true
    }

    const joiningDate = new Date(createdAt ?? visitedUser.createdAtOAuth).getFullYear()

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
            console.log('spotsCreated.current', spotsCreated.current)
            spotsCreated.current?.scrollIntoView({ behavior: 'smooth', offsetTop: -30 })
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

    const [changePwdText, setChangePwdText] = useState('Change your password')

    const userID = router.query.userID

    // Send email to reset pws
    const pwdChangeHandler = async () => {
        const sendPwdReset = await sendPwdResetMail(currentUser.user.email)
        if (!sendPwdReset.success) {
            router.push(
                {
                    query: {
                        userID,
                        [KEY]: VALUE_RESET_PWD_EMAIL_SENT_FAILURE,
                    },
                },
                undefined,
                {
                    shallow: true,
                },
            )
            return
        }

        setChangePwdText('Check your e-mails 👍')

        router.push(
            {
                query: {
                    userID,
                    [KEY]: VALUE_RESET_PWD_EMAIL_SENT_SUCCESS,
                },
            },
            undefined,
            {
                shallow: true,
            },
        )
    }

    const descriptionUpdateHandler = isChangeSuccessful => {
        if (!isChangeSuccessful) {
            router.push(
                {
                    query: {
                        userID,
                        [KEY]: VALUE_EDIT_DESC_FAILURE,
                    },
                },
                undefined,
                {
                    shallow: true,
                },
            )
        } else {
            router.push(
                {
                    query: {
                        userID,
                        [KEY]: VALUE_EDIT_DESC_SUCCESS,
                    },
                },
                undefined,
                {
                    shallow: true,
                },
            )
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
                            <UserImage
                                noCloudi={provider !== 'credentials'}
                                alt={`Profile picture of ${name}`}
                                suggestAddCustom={!profilePic?.isCustom}
                                picLink={profilePic?.link}
                                noBorder
                                size={'w-32 h-32'}
                            />
                            <UserStats
                                onScrollClick={scrollClickHandler}
                                nbOwned={spotsOwned.length}
                                nbVisited={visitedSpots.length}
                                nbReviewed={spotsUserReviewed.length}
                                isCurrentUserVisitedUser={isCurrentUserVisitedUser}
                                isOAuth={currentUser?.user.provider !== 'credentials'}
                                onChangePasswordRequest={pwdChangeHandler}
                                changePwdText={changePwdText}
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
                                    <div className="flex items-center gap-x-2 sm:gap-x-3">
                                        <h1 className={`${TITLE_FS} font-bold break-all`}>
                                            Hi, I am {name} 👋
                                        </h1>
                                        <button
                                            aria-label="Open user menu"
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
                                    {countryOfOrigin ? (
                                        <CountryDisplayer
                                            name={countryOfOrigin.name}
                                            code={countryOfOrigin.code}
                                            context={'userPage'}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    <p className={`${SMALL_TEXT_FS} mt-2`}>
                                        Joined in {joiningDate}
                                    </p>
                                </>
                            )}
                        </div>

                        <div className={`${hideOnLarge}`}>
                            {isLoading ? (
                                <SkeletonImage
                                    style={'w-20 sm:w-28 h-20 sm:h-28 rounded-full'}
                                />
                            ) : (
                                <UserImage
                                    noCloudi={provider !== 'credentials'}
                                    alt={`Profile picture of ${name}`}
                                    suggestAddCustom={!profilePic?.isCustom}
                                    picLink={profilePic?.link}
                                    noBorder
                                    size={'w-20 sm:w-28 h-20 sm:h-28'}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={`${hideOnLarge} flex flex-col gap-y-4 font-semibold items-center lg:items-start `}
                    >
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
                                isCurrentUserVisitedUser={isCurrentUserVisitedUser}
                                isOAuth={currentUser?.user.provider !== 'credentials'}
                                onChangePasswordRequest={pwdChangeHandler}
                                changePwdText={changePwdText}
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
                                    About Me
                                </h2>
                                <UserDescription
                                    onDescriptionUpdate={descriptionUpdateHandler}
                                    userID={visitedUserID}
                                    userName={name}
                                    initialDesc={description}
                                    isProfileOwner={isCurrentUserVisitedUser}
                                />
                            </>
                        )}
                    </div>
                    <DividerDesign />
                    <RelatedSpots
                        isLoading={isLoading}
                        title={`${name}'s Spots 👇🏼`}
                        refClick={spotsCreated}
                        spots={spotsOwned ?? []}
                    />
                    <RelatedSpots
                        isLoading={isLoading}
                        title={`Spots ${name} visited 👇🏼`}
                        refClick={spotsVisited}
                        spots={visitedSpots ?? []}
                    />
                    <RelatedSpots
                        isLoading={isLoading}
                        title={`Spots ${name} reviewed 👇🏼`}
                        refClick={spotsReviewed}
                        spots={spotsUserReviewed ?? []}
                    />
                </div>
            </div>
        </>
    )
}

export default UserCard
