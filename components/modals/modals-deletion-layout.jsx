import { useState } from 'react'

import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'

import { DISABLED_STYLE } from '../../constants/disabled-style'

import Spinner from '../spinner'

const LayoutModalDeletion = ({
    onCloseModal,
    onConfirmedAction,
    text,
    text2,
    btnConfirm,
    btnCancel,
}) => {
    const shouldCloseModal = evt => {
        const shouldTriggerModalClose = evt.target.hasAttribute('close-modal')
        if (shouldTriggerModalClose) {
            onCloseModal()
        }
    }

    const [shouldModalLoad, setShouldModalLoad] = useState(false)
    const confirmDeletionHandler = () => {
        setShouldModalLoad(true)
        onConfirmedAction()
    }
    return (
        <>
            <div className="overlay"></div>
            <div
                close-modal="true"
                onClick={shouldCloseModal}
                className="transition-modal z-[99999] overflow-hidden text-form-color centerModalWrapper"
            >
                <div className="relative bg-white rounded-lg shadow centerAbsoluteContent w-[80%] md:w-[50%]">
                    <button
                        aria-label="Close modal"
                        onClick={onCloseModal}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                    <div className="p-6 text-center">
                        <RiErrorWarningLine className="mb-4 mx-auto w-14 h-14 text-primary" />
                        <h3 className="text-lg">{text}</h3>
                        <h4 className="mb-5 text-lg font-semibold">{text2}</h4>
                        <button
                            disabled={shouldModalLoad}
                            aria-label={btnConfirm}
                            onClick={confirmDeletionHandler}
                            className={`${DISABLED_STYLE} text-white bg-primary hover:bg-primary-hov rounded-lg inline-flex items-center px-5 py-2.5 text-center mr-2 mb-2 sm:mb-0`}
                        >
                            {btnConfirm}
                            {shouldModalLoad ? (
                                <Spinner color={'border-t-secondary'} />
                            ) : (
                                ''
                            )}
                        </button>

                        <button
                            disabled={shouldModalLoad}
                            aria-label={btnCancel}
                            onClick={onCloseModal}
                            className={`${DISABLED_STYLE} text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 px-5 py-2.5 ${
                                !shouldModalLoad ? 'hover:text-gray-900' : ''
                            }`}
                        >
                            {btnCancel}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutModalDeletion
