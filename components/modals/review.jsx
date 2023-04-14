import { Rating } from 'react-simple-star-rating'

import { PATHS } from '../../constants/URLs'

import ClickableUserImage from '../wrapper-clickable-user-image'

import ReviewEditor from '../reviews-new/review-editor'

const Review = ({ reviewAuthorDetails, currUserID, date, rate, comment }) => {
    const { name: revAuthorName, _id: revAuthorID } = reviewAuthorDetails

    const linkToUserProfile = `${PATHS.PROFILE}/${revAuthorID}`

    const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' })

    const isCurrUserReviewAuthor = revAuthorID === currUserID ? true : false

    const reviewEditRequestHandler = param => {
        console.log('9', 9)

        // display review mode but with initial value as review and star
    }
    return (
        <>
            <div className="flex flex-col items-start gap-y-2">
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-x-2 justify-center items-center">
                        <ClickableUserImage
                            url={linkToUserProfile}
                            width={'w-10'}
                            height={'h-10'}
                        />
                        <div className="flex flex-col">
                            <div className="font-semibold flex items-center gap-x-1">
                                <span> {revAuthorName}</span>
                                <Rating
                                    readonly
                                    initialValue={rate}
                                    emptyStyle={{ display: 'flex ' }}
                                    fillStyle={{ display: '-webkit-inline-box' }}
                                    size={20}
                                />
                            </div>
                            <p className="text-sm font-light text-greyText ">
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                    <div>
                        {isCurrUserReviewAuthor ? (
                            <ReviewEditor
                                onReviewEditRequest={reviewEditRequestHandler}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div className="text-xs sm:text-sm leading-6">{comment}</div>
            </div>
        </>
    )
}

export default Review
