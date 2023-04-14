import { MdGrade } from 'react-icons/md'

import { GRADE_CARD_FS } from '../constants/responsive-fonts'

const SpotSpecsDisplayer = ({ reviewsQty, nbOfVisits, averageGrade }) => {
    const shouldReviewBePluralized = reviewsQty === 0 || reviewsQty > 1

    return (
        <div
            className={`${GRADE_CARD_FS} flex justify-center items-center gap-x-1 font-semibold text-form-color`}
        >
            <MdGrade />
            <span>{averageGrade} </span>
            <span>·</span>
            <button className="underline decoration-primary underline-offset-4 text-primary">
                <span>
                    {reviewsQty} {shouldReviewBePluralized ? 'reviews' : 'review'}
                </span>
            </button>
            <span>·</span>
            <span>
                {nbOfVisits} {nbOfVisits > 1 ? 'visits' : 'visit'}
            </span>
        </div>
    )
}

export default SpotSpecsDisplayer
