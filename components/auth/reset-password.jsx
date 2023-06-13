import { useState } from 'react'
import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/router'

import { signIn } from 'next-auth/react'

import { SMALL_TEXT_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'
import { BUTTON_FS } from '../../constants/responsive-fonts'
import { doublePwdFieldSchema } from '../../constants/validation-schemas'

import { editUserHandler } from '../../services/mongo-fetchers'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
import { PATHS } from '../../constants/URLs'

import Spinner from '../spinner'

const { KEY, VALUE_RESET_PWD_SUCCESS, VALUE_RESET_PWD_FAILURE } = TOAST_PARAMS

import { FORM_LABEL_FS } from '../../constants/responsive-fonts'

const ResetPassword = ({ userID }) => {
    const [isPwdVisible, setIsPwdVisible] = useState(false)

    const router = useRouter()

    // Formik - Submit Fx
    const onSubmitFormik = async formValues => {
        const { password: newPwd } = formValues

        const changeUserPwd = await editUserHandler(true, newPwd, userID)

        if (!changeUserPwd.success) {
            router.push(`${PATHS.HOME}?${KEY}=${VALUE_RESET_PWD_FAILURE}`)
            return
        }
        const { email } = changeUserPwd.result

        await signIn('credentials', {
            email,
            password: newPwd,
            redirect: false,
        })

        router.push(`${PATHS.HOME}?${KEY}=${VALUE_RESET_PWD_SUCCESS}`)
    }

    // Yup Validation Schema
    const validationSchemaYup = doublePwdFieldSchema

    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: { password: '', password2: '' },
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup,
    })

    const validStyling = field => {
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: 'border-2 border-primary',
                message: (
                    <span className={`${SMALL_TEXT_FS} !text-primary `}>
                        {formik.errors[field]}
                    </span>
                ),
            }
        } else {
            return { border: '', message: '' }
        }
    }

    const shouldBtnBeDisabled = () => {
        if (formik.isSubmitting) {
            return true
        }
        if (formik.touched.password && Object.keys(formik.errors).length > 0) {
            return true
        }
        return false
    }

    return (
        <>
            <form noValidate onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-y-8 w-[80%] sm:w-[30%] mx-auto my-10">
                    <div>
                        <div className="space-y-2">
                            <label
                                className={`text-form-color ${FORM_LABEL_FS}`}
                                htmlFor="password"
                            >
                                Enter your new password
                            </label>
                            <div className="relative">
                                <input
                                    {...formik.getFieldProps('password')}
                                    // ref={pwdRef}
                                    disabled={formik.isSubmitting}
                                    className={`
                                    ${validStyling('password').border}
                                    ${DISABLED_STYLE}  
                                    p-2 rounded-xl border w-full 
                            `}
                                    type={isPwdVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    id="password"
                                />
                                <button
                                    onClick={() => setIsPwdVisible(prev => !prev)}
                                    type="button"
                                    className=""
                                >
                                    {isPwdVisible ? (
                                        <AiFillEyeInvisible className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                    ) : (
                                        <AiFillEye className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <span className="mt-1">{validStyling('password').message}</span>
                    </div>

                    <div>
                        <div className="space-y-2">
                            <label
                                className={`text-form-color ${FORM_LABEL_FS}`}
                                htmlFor="password2"
                            >
                                Confirm your new password
                            </label>

                            <div className="relative">
                                <input
                                    {...formik.getFieldProps('password2')}
                                    // ref={pwdRef}
                                    disabled={formik.isSubmitting}
                                    className={`
                                    ${validStyling('password2').border}
                                    ${DISABLED_STYLE}  
                                    p-2 rounded-xl border w-full 
                            `}
                                    type={isPwdVisible ? 'text' : 'password'}
                                    name="password2"
                                    id="password2"
                                    placeholder="Password2"
                                />
                                <button
                                    onClick={() => setIsPwdVisible(prev => !prev)}
                                    type="button"
                                    className=""
                                >
                                    {isPwdVisible ? (
                                        <AiFillEyeInvisible className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                    ) : (
                                        <AiFillEye className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <span className="mt-1">{validStyling('password2').message}</span>
                    </div>

                    <button
                        type="submit"
                        disabled={shouldBtnBeDisabled()}
                        className={`
                            ${BUTTON_FS} ${DISABLED_STYLE}
                            text-white font-bold py-3 bg-primary rounded-lg w-full
                    `}
                    >
                        Reset your password
                        {formik.isSubmitting && (
                            <Spinner color={'border-t-secondary'} className="ml-2" />
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}

export default ResetPassword
