// import { useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'

import { useRouter } from 'next/router'

import { signOut } from 'next-auth/react'

// import { useContext } from 'react'
// import { ModalsContext } from '../../context/AppContext'

import { deleteUserHandler } from '../../services/mongo-fetchers'

import { PATHS } from '../../constants/URLs'
import { KEY, VALUE_DELETED_USER_SUCCESS } from '../../constants/toast-query-params'

import { CiRouter } from 'react-icons/ci'

const DeleteAccountConfirmationModal = ({ children, modalContextAccountDeletion }) => {
    // const modalContext = useContext(ModalsContext)

    const router = useRouter()

    const overlayCSS =
        'black-overlay w-screen h-screen fixed z-[999] backdrop-blur-sm bg-[rgb(49,49,49)]/80'

    const closeModal = () => {
        modalContextAccountDeletion.toggleModalState()
    }
    const userConfirmedDeletion = async () => {
        console.log('WANT TO DELETE USER...')

        // Signing out user and redirect
        signOut()

        const deleteUser = await deleteUserHandler(
            modalContextAccountDeletion.userToDelete,
        )
        console.log('deleteUser', deleteUser)

        router.push(
            { pathname: PATHS.HOME, query: { [KEY]: VALUE_DELETED_USER_SUCCESS } },
            undefined,
        )
    }

    return (
        <>
            {modalContextAccountDeletion.isActive && (
                <>
                    <div className={`${overlayCSS}`}> </div>
                    <div className="flex items-center justify-center top-0 left-0 w-full h-full fixed z-[99999] p-4 overflow-x-hidden overflow-y-auto md:inset-0 text-form-color">
                        <div className="relative w-full h-full max-w-md md:h-auto  bg-white rounded-lg shadow">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                                data-modal-hide="popup-modal"
                            >
                                <AiOutlineClose className="w-5 h-5" />
                            </button>
                            <div className="p-6 text-center">
                                <RiErrorWarningLine className="mb-4 mx-auto w-14 h-14 text-primary" />
                                <h3 className="mb-5 text-lg font-normal">
                                    Are you sure you want to delete your account?
                                </h3>
                                <button
                                    onClick={userConfirmedDeletion}
                                    className="text-white bg-primary hover:bg-primary-hov rounded-lg inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                    Yes, I'm sure
                                </button>

                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200  px-5 py-2.5 hover:text-gray-900 "
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {children}
        </>
    )
}

export default DeleteAccountConfirmationModal
