import { BsFlag } from 'react-icons/bs'
import { CiShare1 } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'

import DividerDesign from './design/divider'

import { useRouter } from 'next/router'

import { TOAST_PARAMS } from '../constants/toast-query-params'
const { KEY, VALUE_FEATURE_NOT_YET_AVAILABLE } = TOAST_PARAMS

import { deleteUserHandler } from '../services/mongo-fetchers'

const ActionMenuUserProfile = ({ isOpen, isCurrentUserVisitedUser }) => {
    const router = useRouter()

    const btnClass = 'p-2 flex items-center gap-x-2 hover:bg-[#f7f7f7]'

    const clickHandler = () => {
        const userID = router.query.userID
        router.push(
            { query: { userID, [KEY]: VALUE_FEATURE_NOT_YET_AVAILABLE } },
            undefined,
            { shallow: true },
        )
    }
    return (
        <div className="relative">
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } z-50 absolute -left-9 md:left-[150%] md:-bottom-8`}
            >
                <div
                    className={`
                        mt-2 w-fit rounded-md bg-white py-1 transform opacity-100 scale-100
                        shadowPF
                        flex flex-col
                        text-[#2D383F]
                        min-w-max
                        `}
                >
                    {isCurrentUserVisitedUser && (
                        <>
                            <button
                                onClick={deleteUserHandler}
                                className={`${btnClass} hover:text-primary`}
                            >
                                <AiOutlineDelete />
                                <span>
                                    <span className="font-semibold">Delete </span>my
                                    account
                                </span>
                            </button>
                            <DividerDesign />
                        </>
                    )}
                    {!isCurrentUserVisitedUser && (
                        <button
                            onClick={clickHandler}
                            className={`${btnClass} hover:text-primary`}
                        >
                            <BsFlag />
                            <span>
                                <span className="font-semibold">Report </span>this user
                            </span>
                        </button>
                    )}

                    <button
                        onClick={clickHandler}
                        className={`${btnClass} hover:text-success`}
                    >
                        <CiShare1 />
                        <span>
                            <span className="font-semibold">Share </span>
                            {`${isCurrentUserVisitedUser ? 'my' : 'this'} profile`}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActionMenuUserProfile
