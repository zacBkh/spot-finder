import { useRouter } from 'next/router'

import { signOut } from 'next-auth/react'
import { deleteUserHandler } from '../../../services/mongo-fetchers'

import LayoutModalDeletion from '../modals-deletion-layout'

import { PATHS } from '../../../constants/URLs'
import { TOAST_PARAMS } from '../../../constants/toast-query-params'

const { KEY, VALUE_DELETED_USER_SUCCESS } = TOAST_PARAMS

const DeleteAccountConfirmationModal = ({ children, modalContextAccountDeletion }) => {
    const router = useRouter()

    const closeModalHandler = () => {
        modalContextAccountDeletion.toggleModalState()
    }

    const userConfirmedDeletionHandler = async () => {
        await router.push({
            pathname: PATHS.HOME,
            query: { [KEY]: VALUE_DELETED_USER_SUCCESS },
        })
        await deleteUserHandler(modalContextAccountDeletion.userToDelete)
        closeModalHandler()

        await signOut({ redirect: false })
    }

    return (
        <>
            {modalContextAccountDeletion.isActive && (
                <LayoutModalDeletion
                    onCloseModal={closeModalHandler}
                    onConfirmedAction={userConfirmedDeletionHandler}
                    text={'Are you sure you want to delete your account?'}
                    text2={'This action is irreversible.'}
                    btnConfirm={'Yes, I am sure.'}
                    btnCancel={'No, cancel'}
                />
            )}
            {children}
        </>
    )
}

export default DeleteAccountConfirmationModal
