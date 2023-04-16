import LayoutModalReview from '../modals-review-layout'

import { useSWRConfig } from 'swr'
import SWR_KEYS from '../../../constants/SWR-keys'

const ReviewDisplayerModal = ({
    children,
    modalContextReviewDisplayer,
    onConfirmedEdit,
}) => {
    const { mutate } = useSWRConfig()

    const closeModalHandler = () => {
        mutate(SWR_KEYS.SPOT_IN_SPOT_PAGE) // triggers re-fetch
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
