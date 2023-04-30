import DeleteAccountConfirmationModal from './modals-content/delete-account-confirmation'
import DeleteSpotConfirmationModal from './modals-content/delete-spot-confirmation'
import ReviewDisplayerModal from './modals-content/reviews-displayer'

const ModalsWrapper = ({ currentModalContext }) => {
    const { confirmAccountDeletion, confirmSpotDeletion, seeSpotReviews } =
        currentModalContext
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

    if (seeSpotReviews.isActive) {
        return <ReviewDisplayerModal modalContextReviewDisplayer={seeSpotReviews} />
    }
}

export default ModalsWrapper
