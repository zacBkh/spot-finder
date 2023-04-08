import { MdGrade } from 'react-icons/md'

import { GRADE_CARD_FS } from '../constants/responsive-fonts'

const SpotSpecsDisplayer = ({ nbOfVisits }) => {
    return (
        <div
            className={`${GRADE_CARD_FS} flex justify-center items-center gap-x-1 font-semibold text-form-color`}
        >
            <MdGrade />
            <span>4.83 </span>
            <span>·</span>
            <button className="underline decoration-primary underline-offset-4 text-primary">
                <span>8 reviews</span>
            </button>
            <span>·</span>
            <span>
                {nbOfVisits} {nbOfVisits > 1 ? 'visits' : 'visit'}
            </span>
        </div>
    )
}

export default SpotSpecsDisplayer
