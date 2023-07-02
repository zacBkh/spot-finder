import { useRouter } from 'next/router'

import { deleteSpotHandler } from '../../../services/mongo-fetchers'

import LayoutModalDeletion from '../modals-deletion-layout'

import { PATHS } from '../../../constants/URLs'
import { TOAST_PARAMS } from '../../../constants/toast-query-params'

const { KEY, VALUE_DELETED_SPOT_SUCCESS } = TOAST_PARAMS

const DeleteSpotConfirmationModal = ({ children, modalContextSpotDeletion }) => {
    const router = useRouter()

    const closeModalHandler = () => {
        modalContextSpotDeletion.toggleModalState()
    }
    const spotConfirmedDeletionHandler = async () => {
        await deleteSpotHandler(modalContextSpotDeletion.spotToDelete)

        await router.push(
            {
                pathname: PATHS.HOME,
                query: { [KEY]: VALUE_DELETED_SPOT_SUCCESS },
            },
            undefined,
        )
        closeModalHandler()
    }

    return (
        <>
            {modalContextSpotDeletion.isActive && (
                <LayoutModalDeletion
                    onCloseModal={closeModalHandler}
                    onConfirmedAction={spotConfirmedDeletionHandler}
                    text={'Are you sure you want to delete this Spot?'}
                    text2={'This action is irreversible.'}
                    btnConfirm={'Yes, I am sure.'}
                    btnCancel={'No, cancel'}
                />
            )}

            {children}
        </>
    )
}

export default DeleteSpotConfirmationModal
