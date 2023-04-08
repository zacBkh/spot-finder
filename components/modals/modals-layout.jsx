import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'

const LayoutModal = ({
    onCloseModal,
    onConfirmedAction,
    text,
    btnConfirm,
    btnCancel,
}) => {
    return (
        <>
            <div onClick={onCloseModal} className="overlay"></div>
            <div className="transition-modal flex items-center justify-center top-0 left-0 fixed z-[99999] p-4 overflow-x-hidden overflow-y-auto md:inset-0 text-form-color w-fit h-fit mx-auto my-auto">
                <div className="relative w-full h-full max-w-md md:h-auto  bg-white rounded-lg shadow">
                    <button
                        onClick={onCloseModal}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="popup-modal"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                    <div className="p-6 text-center">
                        <RiErrorWarningLine className="mb-4 mx-auto w-14 h-14 text-primary" />
                        <h3 className="mb-5 text-lg font-normal">{text}</h3>
                        <button
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
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutModal
