import { useContext } from 'react'

import { BsFlag } from 'react-icons/bs'
import { CiShare1 } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'

import DividerDesign from './design/divider'

import { useRouter } from 'next/router'

import { TOAST_PARAMS } from '../constants/toast-query-params'

import { ModalsContext } from '../context/AppContext'

const { KEY, VALUE_FEATURE_NOT_YET_AVAILABLE } = TOAST_PARAMS

const ActionMenuUserProfile = ({ isOpen, isCurrentUserVisitedUser, currentUserID }) => {
    const modalContext = useContext(ModalsContext)

    const router = useRouter()

    const btnClass = 'p-2 flex items-center gap-x-2 hover:bg-[#f7f7f7]'

    const reportUserHandler = () => {
        const userID = router.query.userID
        router.push(
            { query: { userID, [KEY]: VALUE_FEATURE_NOT_YET_AVAILABLE } },
            undefined,
            { shallow: true },
        )
    }

    // Will open modal
    const deleteAccountRequestHandler = () => {
        modalContext.confirmAccountDeletion.newUserToDeleteHandler(currentUserID)
        modalContext.confirmAccountDeletion.toggleModalState()
    }
    return (
        <div className="relative">
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } z-50 absolute -left-[400%] md:left-[150%] md:-bottom-14 transition-menu-zoom`}
            >
                <div
                    className={`
                        mt-2 w-fit rounded-md bg-white py-1 opacity-100 scale-100
                        shadowPF
                        flex flex-col
                        text-dark-color
                        min-w-max
                        `}
                >
                    {isCurrentUserVisitedUser && (
                        <>
                            <div
                                onClick={deleteAccountRequestHandler}
                                className={`${btnClass} hover:text-primary`}
                            >
                                <AiOutlineDelete />
                                <span>
                                    <span className="font-semibold">Delete </span>my
                                    account
                                </span>
                            </div>
                            <DividerDesign />
                        </>
                    )}
                    {!isCurrentUserVisitedUser && (
                        <div
                            onClick={reportUserHandler}
                            className={`${btnClass} hover:text-primary`}
                        >
                            <BsFlag />
                            <span>
                                <span className="font-semibold">Report </span>this user
                            </span>
                        </div>
                    )}

                    <div
                        onClick={reportUserHandler}
                        className={`${btnClass} hover:text-success`}
                    >
                        <CiShare1 />
                        <span>
                            <span className="font-semibold">Share </span>
                            {`${isCurrentUserVisitedUser ? 'my' : 'this'} profile`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionMenuUserProfile
