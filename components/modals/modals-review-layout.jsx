import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { MdGrade, MdOutlineRateReview } from 'react-icons/md'

import Review from './review'

import {
    REVIEW_MODAL_FS,
    REVIEW_MODAL_SECONDARY_FS,
    BUTTON_FS,
} from '../../constants/responsive-fonts'

import Reviewer from '../reviews-new/reviewer-wrapper'
import DividerDesign from '../design/divider'

const LayoutModalReview = ({ onCloseModal, spotDetails }) => {
    const [isOnAddReviewMode, setIsOnAddReviewMode] = useState(false)
    const addReviewModeHandler = async () => {
        setIsOnAddReviewMode(prev => !prev)
    }

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
                                            {spotDetails.title}
                                        </div>
                                        <div className={`${REVIEW_MODAL_SECONDARY_FS}`}>
                                            {spotDetails.country}
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
                                max-h-[63vh]  md:max-h-[60vh] 
                                overflow-y-auto h-fit px-4 text-start flex flex-col gap-y-10"
                            >
                                <Review />
                                <Review />
                                <Review />
                                <Review />
                                <Review />
                            </div>
                        )}

                        {isOnAddReviewMode && (
                            <Reviewer
                                spotID={spotDetails.spotID}
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
