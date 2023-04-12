import { AiOutlineTrophy } from 'react-icons/ai'
import { ImEye } from 'react-icons/im'
import { MdOutlineRateReview } from 'react-icons/md'

import { BODY_FS } from '../../constants/responsive-fonts'
const UserStats = ({ nbOwned, nbVisited, nbReviewed, onScrollClick }) => {
    const specStyle = 'flex items-center gap-x-2'

    const shouldSpecBePluralized = spec => {
        return spec === 0 || spec > 1 ? 'Spots' : 'Spot'
    }

    return (
        <>
            <div className="flex flex-col gap-y-4 font-semibold">
                <button
                    className={`${specStyle}`}
                    onClick={() => onScrollClick('created')}
                >
                    <AiOutlineTrophy className={`text-2xl`} />
                    <span className={BODY_FS}>
                        {nbOwned} {shouldSpecBePluralized(nbOwned)} created
                    </span>
                </button>
                <button
                    className={`${specStyle}`}
                    onClick={() => onScrollClick('visited')}
                >
                    <ImEye className={`text-xl`} />{' '}
                    <span className={BODY_FS}>
                        {nbVisited} {shouldSpecBePluralized(nbVisited)} visited
                    </span>
                </button>
                <button
                    className={`${specStyle}`}
                    onClick={() => onScrollClick('reviewed')}
                >
                    <MdOutlineRateReview className={`text-xl`} />
                    <span className={BODY_FS}>
                        {nbReviewed} {shouldSpecBePluralized(nbReviewed)} reviewed
                    </span>
                </button>
            </div>
        </>
    )
}

export default UserStats
