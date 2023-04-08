import { useRouter } from 'next/router'

// import { signOut } from 'next-auth/react'
// import { deleteUserHandler } from '../../../services/mongo-fetchers'

import LayoutModalReview from '../modals-review-layout'

import { PATHS } from '../../../constants/URLs'
import { TOAST_PARAMS } from '../../../constants/toast-query-params'
const { KEY, VALUE_DELETED_USER_SUCCESS } = TOAST_PARAMS

const ReviewDisplayerModal = ({ children, modalContextReviewDisplayer }) => {
    const router = useRouter()

    const closeModalHandler = () => {
        modalContextReviewDisplayer.toggleModalState()
    }

    const userConfirmedDeletionHandler = async () => {
        console.log('YOU CONFIRMED ACTION')
        // await deleteUserHandler(modalContextAccountDeletion.userToDelete)
        // await signOut({ redirect: false })

        // await router.push({
        //     pathname: PATHS.HOME,
        //     query: { [KEY]: VALUE_DELETED_USER_SUCCESS },
        // })

        closeModal()
    }

    return (
        <>
            {modalContextReviewDisplayer.isActive && (
                <>
                    <LayoutModalReview
                        spotDetails={modalContextReviewDisplayer.spotDetails}
                        onCloseModal={closeModalHandler}
                        onConfirmedAction={userConfirmedDeletionHandler}
                        text={'AAAA'}
                        btnConfirm={'BBB'}
                        btnCancel={'CCC'}
                    />
                </>
            )}
            {children}
        </>
    )
}

export default ReviewDisplayerModal
