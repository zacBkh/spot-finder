import { AiOutlineTrophy } from 'react-icons/ai'
import { ImEye } from 'react-icons/im'
import { MdOutlineRateReview } from 'react-icons/md'

import { BODY_FS } from '../../constants/responsive-fonts'
const UserStats = ({ nbOwned, nbVisited, nbReviewed }) => {
    const specStyle = 'flex items-center gap-x-2'

    return (
        <>
            <div className="flex flex-col gap-y-4 font-semibold">
                <div className={`${specStyle}`}>
                    <AiOutlineTrophy className={`text-2xl`} />
                    <span className={BODY_FS}> {nbOwned} Spots created</span>
                </div>
                <div className={`${specStyle}`}>
                    <ImEye className={`text-xl`} />{' '}
                    <span className={BODY_FS}> {nbVisited} Spots visited</span>
                </div>
                <div className={`${specStyle}`}>
                    <MdOutlineRateReview className={`text-xl`} />
                    <span className={BODY_FS}> {nbReviewed} Spots reviewed</span>
                </div>
            </div>
        </>
    )
}

export default UserStats
