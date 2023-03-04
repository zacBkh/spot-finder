import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { PATHS } from '../../constants/URLs'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const { KEY, VALUE_LOGIN, VALUE_NEW_USER } = TOAST_PARAMS

import { BUTTON_FS, FORM_VALID_FS } from '../../constants/responsive-fonts'
import { checkEmailUniq } from '../../utils/APIfetchers'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import Spinner from '../spinner'

const EMailLogger = ({ authMode, onSelectEMail, isnewUser }) => {
    const router = useRouter()

    const [isPwdVisible, setIsPwdVisible] = useState(false)

    // Store login failure/success info
    const [authResult, setAuthResult] = useState('')

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
                border: 'border-2 border-primary',
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

    const mailFieldSchema = {
        email: Yup.string()
            .trim()
            .lowercase()
            .required('Your Email is required.')
            .email('It seems like this is not an email...'),
    }

    const pwdFieldSchema = {
        password: Yup.string()
            .trim()
            .min(6, 'Your password should be at least 6 characters long!')
            .required('Password is required'),
    }

    const nameFieldSchema = {
        name: Yup.string()
            .trim()
            .min(3, 'Your name should be at least 3 characters long.')
            .required('Name is required'),
    }

    let validationSchema
    if (authMode === null) {
        // if only email is required for now
        validationSchema = mailFieldSchema
    } else if (!isnewUser) {
        // if pwd field appeared
        validationSchema = { ...mailFieldSchema, ...pwdFieldSchema }
    } else {
        // if is registering a new user
        validationSchema = { ...mailFieldSchema, ...pwdFieldSchema, ...nameFieldSchema }
    }
    const validYupEmailLogger = Yup.object().shape({ ...validationSchema })

    let onSubmitHandler
    if (authMode === null) {
        // if still on STEP 1 login (no pwd field)
        onSubmitHandler = async formValues => {
            const { email } = formValues
            console.log('email', email)

            const isUserNew = await checkEmailUniq(email)
            if (isUserNew.result) {
                onSelectEMail('credentials', email, true)
                formik.touched.name = false
            } else {
                onSelectEMail('credentials', email, false)
            }
            formik.touched.password = false
        }
    } else {
        if (!isnewUser) {
            // login
            onSubmitHandler = async formValues => {
                console.log('LOGGING IN....')
                console.log('formValues login', formValues)
                // WRITE LOGIC TO LOGIN
                const loginResult = await signIn('credentials', {
                    ...formValues,
                    redirect: false,
                })

                console.log('loginResult', loginResult)

                // if auth issue linked to creds...
                if (!loginResult.ok && loginResult.error === 'CredentialsSignin') {
                    setAuthResult('Invalid credentials.')
                } else {
                    // returnToURL !== null ? router.push(HOME) : router.push(HOME)
                    router.push(`${PATHS.HOME}?${KEY}=${VALUE_LOGIN}`)
                }
            }
        } else {
            // register
            onSubmitHandler = async formValues => {
                console.log('REGISTERING....')
                // WRITE LOGIC TO REGISTER
            }
        }
    }

    const formik = useFormik({
        initialValues: { email: '', password: '', name: '' },
        onSubmit: onSubmitHandler,
        validationSchema: validYupEmailLogger,
    })

    // console.log('formik', formik)
    return (
        <div>
            <form noValidate onSubmit={formik.handleSubmit} className="space-y-5">
                {/* EMAIL FIELD */}
                <div>
                    <input
                        autoFocus
                        {...formik.getFieldProps('email')}
                        disabled={formik.isSubmitting}
                        className={`${validStyling('email').border}
                            rounded-lg border w-full
                            disabled:bg-disabled disabled:cursor-not-allowed transition-colors duration-200
                        `}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <div className="mt-1">{validStyling('email').message}</div>
                </div>

                {/* NAME FIELD */}
                {isnewUser === true && (
                    <div>
                        <input
                            {...formik.getFieldProps('name')}
                            disabled={formik.isSubmitting}
                            className={`${validStyling('email').border}
                            rounded-lg border w-full
                            disabled:bg-disabled disabled:cursor-not-allowed transition-colors duration-200
                        `}
                            type="text"
                            name="name"
                            placeholder="Name"
                        />
                        <div className="mt-1">{validStyling('name').message}</div>
                    </div>
                )}

                {/* PWD FIELD */}
                {authMode === 'credentials' && (
                    <div>
                        <div className="relative">
                            <input
                                autoFocus
                                {...formik.getFieldProps('password')}
                                className={`${
                                    validStyling('password').border
                                } p-2 rounded-xl border w-full 
                            `}
                                type={isPwdVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                            />
                            <button
                                onClick={() => setIsPwdVisible(prev => !prev)}
                                type="button"
                                className=""
                            >
                                {isPwdVisible ? (
                                    <AiFillEyeInvisible className="absolute top-1/2 right-3 -translate-y-1/2 text-xl " />
                                ) : (
                                    <AiFillEye className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                )}
                            </button>
                        </div>
                        <div className="mt-1">{validStyling('password').message}</div>
                    </div>
                )}

                <div className="text-primary text-center">{authResult}</div>

                {/* SUBMIT FIELD */}
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
