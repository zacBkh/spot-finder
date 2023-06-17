import { AiOutlineTrophy } from 'react-icons/ai'
import { ImEye } from 'react-icons/im'
import { MdOutlineRateReview } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

import DividerDesign from '../design/divider'

import { BODY_FS } from '../../constants/responsive-fonts'

const UserStats = ({
    changePwdText,
    onChangePasswordRequest,

    nbOwned,
    nbVisited,
    nbReviewed,
    onScrollClick,
    isCurrentUserVisitedUser,
    isOAuth,
}) => {
    const specStyle = 'flex items-center gap-x-2 hover:underline'

    const shouldSpecBePluralized = spec => {
        return spec === 0 || spec > 1 ? 'Spots' : 'Spot'
    }

    return (
        <>
            <div className="flex flex-col gap-y-4 font-semibold">
                <button
                    aria-label="See spots this user created"
                    className={`${specStyle}`}
                    onClick={() => onScrollClick('created')}
                >
                    <AiOutlineTrophy className={`text-2xl`} />
                    <span className={BODY_FS}>
                        {nbOwned} {shouldSpecBePluralized(nbOwned)} created
                    </span>
                </button>
                <button
                    aria-label="See spots this user visited"
                    className={`${specStyle}`}
                    onClick={() => onScrollClick('visited')}
                >
                    <ImEye className={`text-xl`} />{' '}
                    <span className={BODY_FS}>
                        {nbVisited} {shouldSpecBePluralized(nbVisited)} visited
                    </span>
                </button>
                <button
                    aria-label="See spots this user reviewed"
                    className={`${specStyle}`}
                    onClick={() => onScrollClick('reviewed')}
                >
                    <MdOutlineRateReview className={`text-xl`} />
                    <span className={BODY_FS}>
                        {nbReviewed} {shouldSpecBePluralized(nbReviewed)} reviewed
                    </span>
                </button>
            </div>

            {isCurrentUserVisitedUser && !isOAuth ? (
                <div>
                    <DividerDesign margin={'mb-4'} />
                    <button
                        aria-label="Change your password"
                        className={`${specStyle} group`}
                        onClick={onChangePasswordRequest}
                    >
                        <RiLockPasswordLine className={`text-2xl`} />
                        <span className={`${BODY_FS} group-hover:underline`}>
                            {changePwdText}
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
