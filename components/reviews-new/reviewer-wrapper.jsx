import { AiOutlineWarning, AiOutlineCheck } from 'react-icons/ai'

import { useFormik } from 'formik'
import { validRateComment } from '../../constants/validation-schemas'

import StarRater from './star-rating'
import Comment from './comment'

import ButtonSpotCard from '../design/button-spot-card'

import { SMALL_TEXT_FS } from '../../constants/responsive-fonts'

import { useRouter } from 'next/router'

import { TOAST_PARAMS } from '../../constants/toast-query-params'

import { addOneReview, editOneReview } from '../../services/mongo-fetchers'

const { KEY, VALUE_REVIEWED_SPOT_SUCCESS } = TOAST_PARAMS

const ReviewerWrapper = ({ onCloseModal, spotID, reviewToEditDetails }) => {
    const router = useRouter()

    const { reviewDetails, reviewID } = reviewToEditDetails ?? {}

    const initialValuesReview = reviewToEditDetails
        ? reviewDetails
        : {
              rate: '',
              comment: '',
          }

    const onSubmitReview = async formValues => {
        if (reviewToEditDetails === null) {
            // if we are not in a review edit mode
            const addRev = await addOneReview(spotID, formValues)
        } else {
            const editRev = await editOneReview(reviewID, formValues)
        }

        onCloseModal()

        router.push(
            { query: { spotID, [KEY]: VALUE_REVIEWED_SPOT_SUCCESS } },
            undefined,
            {
                shallow: true,
            },
        )
    }

    const formik = useFormik({
        initialValues: initialValuesReview,
        onSubmit: onSubmitReview,
        validationSchema: validRateComment,
    })

    const validStyling = field => {
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: 'border-2 border-primary ',
                message: (
                    <div
                        className={`${SMALL_TEXT_FS} !text-primary flex justify-start gap-x-2 items-center`}
                    >
                        <AiOutlineWarning className="text-base " />
                        {field === 'comment'
                            ? `${formik.errors[field]}, ${
                                  70 - formik.values.comment.length
                              } characters remaining`
                            : formik.errors[field]}
                    </div>
                ),
            }
        } else {
            return { border: '', message: '' }
        }
    }

    const userRateHandler = grade => {
        formik.setFieldTouched('rate', true)
        formik.setFieldValue('rate', grade)
    }

    return (
        <>
            <form
                noValidate
                onSubmit={formik.handleSubmit}
                className="space-y-6 mt-4 px-1 pb-2
                max-h-[63vh] md:max-h-[58vh] overflow-y-auto h-fit"
            >
                <StarRater
                    initialRate={reviewToEditDetails?.reviewDetails.rate}
                    onUserRate={userRateHandler}
                    errorFeedback={validStyling('rate')}
                />
                <Comment
                    formikWizardComment={formik.getFieldProps('comment')}
                    errorFeedback={validStyling('comment')}
                />
                <ButtonSpotCard
                    shouldBeDisabled={formik.isSubmitting}
                    iconFirst
                    isSubmitBtn
                    icon={<AiOutlineCheck />}
                    text={'Submit your review'}
                />
            </form>
        </>
    )
}

export default ReviewerWrapper
