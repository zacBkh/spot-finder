import { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { MdGrade, MdOutlineRateReview } from 'react-icons/md'

import Review from './review'

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/router'

import {
    REVIEW_MODAL_FS,
    REVIEW_MODAL_SECONDARY_FS,
    BUTTON_FS,
} from '../../constants/responsive-fonts'

import ReviewerWrapper from '../reviews-new/reviewer-wrapper'
import DividerDesign from '../design/divider'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const { KEY_REQUIRE, VALUE_MUST_LOGIN_TO_REVIEW, VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW } =
    TOAST_PARAMS

const LayoutModalReview = ({ onCloseModal, spotDetails }) => {
    const { spotID, authorID, title, country, reviews } = spotDetails

    const router = useRouter()
    console.log('router.events', router.events)

    const { data: session, status } = useSession()

    const [isOnAddReviewMode, setIsOnAddReviewMode] = useState(false)
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

        if (session.userID === authorID) {
            router.push(
                { query: { spotID, [KEY_REQUIRE]: VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW } },
                undefined,
                {
                    shallow: true,
                },
            )
            return
        }

        setIsOnAddReviewMode(prev => !prev)
    }

    // Close modal if user change path
    useEffect(() => {
        onCloseModal()
    }, [router.pathname])

    return (
        <>
            <div onClick={onCloseModal} className="overlay"></div>
            <div className="transition-modal flex items-center justify-center top-0 left-0 fixed z-[99999] overflow-hidden inset-0 text-form-color mx-auto my-auto w-[80vw] max-w-[90vw] sm:max-w-[80vw] h-[85vh]  ">
                <div className="relative w-full h-full bg-white rounded-lg shadow">
                    <button
                        onClick={onCloseModal}
                        type="button"
                        className="absolute top-1 right-1 sm:top-3 sm:right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="popup-modal"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col p-3 sm:p-6 text-center">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center gap-x-6 sm:gap-x-16 bg-white ">
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
                                        <span className="">4.95</span>
                                        <span>· 8 reviews</span>
                                    </h2>
                                </div>

                                <button
                                    onClick={addReviewModeHandler}
                                    className={`buttonWrapper text-white bg-primary hover:bg-primary-hov hover:underline rounded-md inline-flex items-center justify-center gap-x-3 px-2 py-2 text-center mr-2 w-40 ${BUTTON_FS}`}
                                >
                                    <span className="iconToAnimate">
                                        {isOnAddReviewMode ? (
                                            <MdOutlineRateReview />
                                        ) : (
                                            <BiEdit />
                                        )}
                                    </span>
                                    {isOnAddReviewMode
                                        ? 'Back to reviews'
                                        : 'Write a review'}
                                </button>
                            </div>
                            <DividerDesign />
                        </div>
                        {!isOnAddReviewMode && (
                            <div
                                className="
                                max-h-[63vh] md:max-h-[60vh] 
                                overflow-y-auto h-fit px-4 text-start flex flex-col gap-y-10"
                            >
                                {reviews.map(rev => (
                                    <Review
                                        key={rev._id}
                                        reviewAuthorDetails={rev.reviewAuthor}
                                        date={new Date(rev.createdAt)}
                                        rate={rev.rate}
                                        comment={rev.comment}
                                    />
                                ))}
                                {/* <Review />
                                <Review />
                                <Review />
                                <Review />
                                <Review /> */}
                            </div>
                        )}

                        {isOnAddReviewMode && (
                            <ReviewerWrapper
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
