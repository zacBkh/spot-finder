import { AiOutlineTrophy } from 'react-icons/ai'
import { ImEye } from 'react-icons/im'
import { MdOutlineRateReview } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

import DividerDesign from '../design/divider'

import { BODY_FS } from '../../constants/responsive-fonts'

const UserStats = ({
    nbOwned,
    nbVisited,
    nbReviewed,
    onScrollClick,
    onChangePasswordRequest,
    isCurrentUserVisitedUser,
}) => {
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

            {isCurrentUserVisitedUser ? (
                <div>
                    <DividerDesign margin={'mb-4'} />
                    <button
                        className={`${specStyle} group`}
                        onClick={onChangePasswordRequest}
                    >
                        <RiLockPasswordLine className={`text-2xl`} />
                        <span className={`${BODY_FS} group-hover:underline`}>
                            Change your password
                        </span>
                    </button>
                </div>
            ) : (
                ''
            )}
        </>
    )
}

export default UserStats
