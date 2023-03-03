import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { signIn } from 'next-auth/react'

import capitalize from '../../utils/capitalize'
import { TOAST_PARAMS } from '../../constants/toast-query-params'

import { BUTTON_FS, FORM_VALID_FS } from '../../constants/responsive-fonts'
import { checkEmailUniq } from '../../utils/APIfetchers'

import Spinner from '../spinner'

const EMailLogger = ({ onSelectEMail }) => {
    const shouldBtnBeDisabled = () => {
        if (formik.isSubmitting) {
            return true
        }
        if (formik.touched.email && Object.keys(formik.errors).length > 0) {
            return true
        }
        return false
    }

    const validStyling = field => {
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: '!border-2 !border-primary',
                message: (
                    <span className={`${FORM_VALID_FS} !text-primary `}>
                        {formik.errors[field]}
                    </span>
                ),
            }
        } else {
            return { border: '', message: '' }
        }
    }

    const validYupEmailLogger = Yup.object().shape({
        email: Yup.string()
            .trim()
            .lowercase()
            .required('Your Email is required.')
            .email('It seems like this is not an email...'),
    })

    const onSubmitEmailLogger = async formValues => {
        const { email } = formValues
        console.log('email', email)

        const isUserNew = await checkEmailUniq(email)
        // HANDLE ERROR HERE IN CASE ?
        onSelectEMail('credentials', email)
        if (isUserNew.result) {
            // already exist --> change state to ask password
        } else {
            // new user --> form to register
        }
        console.log('isUserNew', isUserNew)
    }

    const formik = useFormik({
        initialValues: { email: '' },
        onSubmit: onSubmitEmailLogger,
        validationSchema: validYupEmailLogger,
    })

    // console.log('formik.isSubmitting', formik.isSubmitting)

    // const callbackURLWithToast = `${callbackURL}${TOAST_PARAMS.LOGIN}`
    return (
        <div className={`${BUTTON_FS}`}>
            <form noValidate onSubmit={formik.handleSubmit} className="space-y-5">
                <div>
                    <input
                        {...formik.getFieldProps('email')}
                        disabled={formik.isSubmitting}
                        className={`${validStyling('email').border}
                            rounded-lg border border-[#b0b0b0] w-full
                            disabled:bg-disabled disabled:cursor-not-allowed transition-colors duration-200
                        `}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <div className="mt-1">{validStyling('email').message}</div>
                </div>
                <button
                    disabled={shouldBtnBeDisabled()}
                    className={`text-white font-bold py-3 bg-primary rounded-lg w-full
                        disabled:text-neutral disabled:bg-disabled transition-colors duration-200
                    `}
                    type="submit"
                >
                    Continue
                    {formik.isSubmitting && (
                        <Spinner size="sm" light={true} className="ml-2" />
                    )}
                </button>
            </form>
        </div>
    )
}

export default EMailLogger
