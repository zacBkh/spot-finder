import DeleteAccountConfirmationModal from './modals-content/delete-account-confirmation'
import DeleteSpotConfirmationModal from './modals-content/delete-spot-confirmation'
import ReviewDisplayerModal from './modals-content/reviews-displayer'

const ModalsWrapper = ({ currentModalContext }) => {
    const confirmEditHanlder = () => {
        console.log('99898', 99898)
    }

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
        return (
            <ReviewDisplayerModal
                onConfirmedEdit={confirmEditHanlder}
                modalContextReviewDisplayer={seeSpotReviews}
            />
        )
    }
}

export default ModalsWrapper
