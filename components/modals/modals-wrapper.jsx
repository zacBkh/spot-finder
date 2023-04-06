import DeleteSpotConfirmationModal from './delete-spot-confirmation'
import DeleteAccountConfirmationModal from './delete-account-confirmation'

const ModalsWrapper = ({ currentModalContext }) => {
    const { confirmAccountDeletion, confirmSpotDeletion } = currentModalContext
    if (confirmAccountDeletion.isActive) {
        return (
            <DeleteAccountConfirmationModal
                modalContextAccountDeletion={confirmAccountDeletion}
            />
        )
    }

    if (confirmSpotDeletion.isActive) {
        return (
            <DeleteSpotConfirmationModal modalContextSpotDeletion={confirmSpotDeletion} />
        )
    }
}

export default ModalsWrapper
