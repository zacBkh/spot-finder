import { AiOutlineClose } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { MdGrade } from 'react-icons/md'

import Review from './review'

import {
    REVIEW_MODAL_FS,
    REVIEW_MODAL_SECONDARY_FS,
    BUTTON_FS,
} from '../../constants/responsive-fonts'

const LayoutModalReview = ({
    onCloseModal,
    onConfirmedAction,
    text,
    btnConfirm,
    btnCancel,
    spotDetails,
}) => {
    return (
        <>
            <div onClick={onCloseModal} className="overlay"></div>
            <div className="transition-modal flex items-center justify-center top-0 left-0 fixed z-[99999]  overflow-hidden inset-0 text-form-color mx-auto my-auto min-w-[30vw] max-w-[90vw] sm:max-w-[70vw] h-[85vh] w-fit ">
                <div className="relative w-full h-full bg-white rounded-lg shadow">
                    <button
                        onClick={onCloseModal}
                        type="button"
                        className="absolute top-1 right-1 sm:top-3 sm:right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="popup-modal"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col gap-y-8 p-3 sm:p-6 text-center">
                        <div className="flex justify-between items-center gap-x-6 sm:gap-x-16 bg-white ">
                            <div className="flex flex-col gap-y-3 text-start">
                                <h1>
                                    <div className={`${REVIEW_MODAL_FS} font-semibold`}>
                                        {spotDetails.title}
                                    </div>
                                    <div className={`${REVIEW_MODAL_SECONDARY_FS}`}>
                                        {spotDetails.country}
                                    </div>
                                </h1>

                                <h2
                                    className={`${REVIEW_MODAL_FS} flex items-center gap-x-1 font-semibold w-max sm:w-auto`}
                                >
                                    <MdGrade className="w-5 h-5" />
                                    <span className="">4.95</span>
                                    <span>· 8 reviews</span>
                                </h2>
                            </div>
                            <button
                                // onClick={onConfirmedAction}
                                className={`buttonWrapper text-white bg-primary hover:bg-primary-hov hover:underline rounded-md inline-flex items-center gap-x-3 px-2 py-2 text-center mr-2  ${BUTTON_FS}`}
                            >
                                <span className="iconToAnimate">
                                    <BiEdit />
                                </span>
                                Write a review
                            </button>
                        </div>

                        <div
                            className="overflow-y-auto h-fit max-h-[65vh]  px-2 text-start  flex flex-col gap-y-10
                        "
                        >
                            <Review />
                            <Review />
                            <Review />
                        </div>
                        {/* <button
                            onClick={onConfirmedAction}
                            className="text-white bg-primary hover:bg-primary-hov rounded-lg inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                            {btnConfirm}
                        </button>

                        <button
                            onClick={onCloseModal}
                            className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 px-5 py-2.5 hover:text-gray-900 "
                        >
                            {btnCancel}
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutModalReview
