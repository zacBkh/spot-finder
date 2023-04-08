import { MdGrade } from 'react-icons/md'

import { GRADE_CARD_FS } from '../constants/responsive-fonts'

const SpotGradeDisplayer = ({ nbOfVisits }) => {
    return (
        <div
            className={`${GRADE_CARD_FS} flex justify-center items-center gap-x-1 font-semibold`}
        >
            <MdGrade />
            <span className="text-form-color">4.83 </span>
            <span className="text-form-color">·</span>
            <button className="underline decoration-primary underline-offset-4 text-primary">
                <span>8 reviews</span>
            </button>
            <span className="text-form-color">·</span>
            <span className="text-form-color">{nbOfVisits} visits </span>
        </div>
    )
}

export default SpotGradeDisplayer
