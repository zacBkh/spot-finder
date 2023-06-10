import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

import { Rating } from 'react-simple-star-rating'

import { PATHS } from '../../constants/URLs'

import ClickableUserImage from '../wrapper-clickable-user-image'

import { useState } from 'react'

import { deleteOneReview } from '../../services/mongo-fetchers'

import { useRouter } from 'next/router'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const { KEY, VALUE_REVIEWED_SPOT_SUCCESS } = TOAST_PARAMS

const Review = ({
    reviewAuthorDetails,
    currUserID,
    reviewID,
    date,
    rate,
    comment,
    onReviewEditRequest,
    onCloseModal,
    spotID,
}) => {
    const router = useRouter()

    const {
        name: revAuthorName,
        _id: revAuthorID,
        profilePic: revAuthorPicture,
    } = reviewAuthorDetails

    const linkToUserProfile = `${PATHS.PROFILE}/${revAuthorID}`

    const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' })

    const isCurrUserReviewAuthor = revAuthorID === currUserID ? true : false

    const [isReviewDeleteStage, setIsReviewDeleteStage] = useState(null)

    const reviewEditRequestHandler = () => {
        onReviewEditRequest({
            reviewID,
            reviewDetails: { comment, rate },
        })
    }

    const confirmDeleteReview = async () => {
        const deleteRev = await deleteOneReview(reviewID)
        onCloseModal()

        router.push(
            { query: { spotID, [KEY]: VALUE_REVIEWED_SPOT_SUCCESS } },
            undefined,
            {
                shallow: true,
            },
        )
    }

    return (
        <>
            <div className="flex flex-col items-start gap-y-2">
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-x-2 justify-center items-center">
                        <ClickableUserImage
                            profilePic={revAuthorPicture}
                            url={linkToUserProfile}
                            width={'w-10 sm:w-14 2xl:w-16'}
                            height={'h-10 sm:h-14 2xl:h-16'}
                        />
                        <div className="flex flex-col">
                            <div className="font-semibold flex flex-col sm:flex-row sm:items-center sm:gap-x-1">
                                <span>{revAuthorName}</span>
                                <Rating
                                    readonly
                                    initialValue={rate}
                                    emptyStyle={{ display: 'flex ' }}
                                    fillStyle={{ display: '-webkit-inline-box' }}
                                    size={18}
                                />
                            </div>
                            <p className="text-sm font-light text-greyText ">
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                    <div>
                        {isCurrUserReviewAuthor ? (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4 text-xs sm:text-sm">
                                <button
                                    onClick={reviewEditRequestHandler}
                                    className="flex items-center gap-x-1 hover:underline"
                                >
                                    <BiEdit />
                                    <span>Edit</span>
                                </button>

                                <button
                                    onClick={
                                        isReviewDeleteStage
                                            ? confirmDeleteReview
                                            : () => setIsReviewDeleteStage(true)
                                    }
                                    className={` ${
                                        isReviewDeleteStage && 'text-primary'
                                    } flex items-center gap-x-1 hover:underline`}
                                >
                                    <AiOutlineDelete />
                                    <span>
                                        {isReviewDeleteStage
                                            ? 'Click to confirm review deletion'
                                            : 'Delete'}
                                    </span>
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div className="text-xs sm:text-sm leading-6 break-all">{comment}</div>
            </div>
        </>
    )
}

export default Review
