import { useState, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { MdGrade, MdOutlineRateReview } from 'react-icons/md'

import Review from './review'

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/router'

import {
    REVIEW_MODAL_FS,
    REVIEW_MODAL_SECONDARY_FS,
} from '../../constants/responsive-fonts'

import ReviewerWrapper from '../reviews-new/reviewer-wrapper'
import DividerDesign from '../design/divider'

import { TOAST_PARAMS } from '../../constants/toast-query-params'

import ErrorIllustration from '../error-illustration'
import NoDataImg from '../../public/images/no-data-found.svg'

import getAvrgGrade from '../../utils/get-average-rate'

import ButtonPrimary from '../design/button-primary'
import { useField } from 'formik'

const {
    KEY_REQUIRE,
    VALUE_MUST_LOGIN_TO_REVIEW,
    VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW,
    VALUE_MUST_NOT_HAVE_ALREADY_REVIEWED,
} = TOAST_PARAMS

const LayoutModalReview = ({ onCloseModal, spotDetails }) => {
    const { spotID, authorID, title, country, reviews } = spotDetails

    const router = useRouter()

    const { data: session, status } = useSession()
    const currUserID = session?.userID

    const [isOnAddReviewMode, setIsOnAddReviewMode] = useState(false)
    const [initialValuesEditReview, setInitialValuesEditReview] = useState(null)

    const addReviewModeHandler = async () => {
        if (status !== 'authenticated') {
            router.push(
                { query: { spotID, [KEY_REQUIRE]: VALUE_MUST_LOGIN_TO_REVIEW } },
                undefined,
                {
                    shallow: true,
                },
            )
            return
        }

        // Run validation logic only if is not already in addReviewMode
        if (!isOnAddReviewMode) {
            // If spot author tries to review
            if (currUserID === authorID) {
                router.push(
                    {
                        query: {
                            spotID,
                            [KEY_REQUIRE]: VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW,
                        },
                    },
                    undefined,
                    {
                        shallow: true,
                    },
                )
                return
            }

            // If user already reviewed this spot
            const hasCurrUserAlreadyReviewed = reviews
                .map(rev => rev.reviewAuthor._id === currUserID)
                .includes(true)

            if (hasCurrUserAlreadyReviewed) {
                router.push(
                    {
                        query: {
                            spotID,
                            [KEY_REQUIRE]: VALUE_MUST_NOT_HAVE_ALREADY_REVIEWED,
                        },
                    },
                    undefined,
                    {
                        shallow: true,
                    },
                )
                return
            }
            setIsOnAddReviewMode(prev => !prev)
        } else {
            setIsOnAddReviewMode(prev => !prev)
        }
    }

    // Switch to review edit mode
    const reviewEditHandler = reviewToEditDetails => {
        setInitialValuesEditReview(reviewToEditDetails)
        setIsOnAddReviewMode(true)
    }

    const sortingFx = rev0 => {
        if (rev0.props.reviewAuthorDetails._id === currUserID) {
            return -1
        }
    }

    const reviewsOrFallback = !reviews.length ? (
        <>
            <ErrorIllustration
                img={NoDataImg}
                altTxt={'No reviews found illustration'}
                title={'This spot does not have any reviews yet.'}
            />
        </>
    ) : (
        reviews
            .map(rev => (
                <Review
                    key={rev._id}
                    reviewAuthorDetails={rev.reviewAuthor}
                    currUserID={currUserID}
                    date={new Date(rev.createdAt)}
                    rate={rev.rate}
                    comment={rev.comment}
                    reviewID={rev._id}
                    onReviewEditRequest={reviewEditHandler}
                    onCloseModal={onCloseModal}
                    spotID={spotID}
                />
            ))
            .sort(sortingFx)
    )

    const shouldReviewBePluralized = reviews.length === 0 || reviews.length > 1

    const shouldCloseModal = evt => {
        const shouldTriggerModalClose = evt.target.hasAttribute('close-modal')
        if (shouldTriggerModalClose) {
            onCloseModal()
        }
    }
    return (
        <>
            <div className="overlay"></div>
            <div
                close-modal="true"
                onClick={shouldCloseModal}
                className="transition-modal z-[9999] overflow-hidden text-form-color centerModalWrapper"
            >
                <div className="relative bg-white !z-[999999] rounded-lg  centerModalContent w-[80%] min-h-[80%]">
                    <button
                        onClick={onCloseModal}
                        type="button"
                        className="absolute top-[2px] right-[2px]  sm:top-1 sm:right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 ml-auto inline-flex items-center"
                    >
                        <AiOutlineClose className="text-base md:text-lg" />
                    </button>
                    <div className="flex flex-col p-3 sm:p-5 h-full text-center">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center gap-x-6 sm:gap-x-16">
                                <div className="flex flex-col gap-y-3 text-start">
                                    <h1>
                                        <div
                                            className={`${REVIEW_MODAL_FS} font-semibold`}
                                        >
                                            {title}
                                        </div>
                                        <div className={`${REVIEW_MODAL_SECONDARY_FS}`}>
                                            {country}
                                        </div>
                                    </h1>

                                    <h2
                                        className={`${REVIEW_MODAL_FS} flex items-center gap-x-1 font-semibold w-max sm:w-auto`}
                                    >
                                        <MdGrade className="w-5 h-5" />
                                        <span>{getAvrgGrade(reviews)}</span>
                                        <span>
                                            · {reviews.length}{' '}
                                            {shouldReviewBePluralized
                                                ? 'reviews'
                                                : 'review'}
                                        </span>
                                    </h2>
                                </div>

                                <ButtonPrimary
                                    isSmaller
                                    onClickHandler={addReviewModeHandler}
                                    icon={
                                        isOnAddReviewMode ? (
                                            <MdOutlineRateReview />
                                        ) : (
                                            <BiEdit />
                                        )
                                    }
                                    text={
                                        isOnAddReviewMode
                                            ? 'Back to reviews'
                                            : 'Write a review'
                                    }
                                />
                            </div>
                            <DividerDesign />
                        </div>
                        {!isOnAddReviewMode && (
                            <div
                                className="
                                max-h-[63vh] md:max-h-[60vh] xl:max-h-[50vh] 
                                overflow-y-auto h-fit px-4 text-start flex flex-col gap-y-10"
                            >
                                {reviewsOrFallback}
                            </div>
                        )}

                        {isOnAddReviewMode && (
                            <ReviewerWrapper
                                reviewToEditDetails={initialValuesEditReview}
                                spotID={spotID}
                                onCloseModal={onCloseModal}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutModalReview
