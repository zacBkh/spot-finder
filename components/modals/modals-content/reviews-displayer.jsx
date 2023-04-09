import LayoutModalReview from '../modals-review-layout'

const ReviewDisplayerModal = ({ children, modalContextReviewDisplayer }) => {
    const closeModalHandler = () => {
        modalContextReviewDisplayer.toggleModalState()
    }

    return (
        <>
            {modalContextReviewDisplayer.isActive && (
                <>
                    <LayoutModalReview
                        spotDetails={modalContextReviewDisplayer.spotDetails}
                        onCloseModal={closeModalHandler}
                    />
                </>
            )}
            {children}
        </>
    )
}

export default ReviewDisplayerModal
