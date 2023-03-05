import { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { BiArrowBack } from 'react-icons/bi'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { PATHS } from '../../constants/URLs'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const { KEY, VALUE_LOGIN, VALUE_NEW_USER } = TOAST_PARAMS

import DISABLED_STYLE from '../../constants/disabled-style'

import {
    BUTTON_FS,
    FORM_VALID_FS,
    ARROW_ICON_FS,
    ARROW_TEXT_FS,
} from '../../constants/responsive-fonts'
import { addUserHandler, checkEmailUniq } from '../../utils/APIfetchers'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import capitalize from '../../utils/capitalize'
import Spinner from '../spinner'

import useInputAutoFocus from '../../hooks/useInputAutoFocus'

import { sendPwdResetMail } from '../../utils/APIfetchers'

const EMailLogger = ({
    authMode,
    onSelectEMail,
    isnewUser,
    returnToURL,
    onForgotPassword,
    isResetPwd,
}) => {
    const router = useRouter()

    const [isPwdVisible, setIsPwdVisible] = useState(false)

    const [resetPwdStatus, setResetPwdStatus] = useState(
        'If an account is linked to this addres, we will send you an e-mail to reset your password.',
    )

    // Store login failure/success info
    const [authResult, setAuthResult] = useState(null)

    const shouldBtnBeDisabled = () => {
        if (formik.isSubmitting) {
            return true
        }
        if (
            formik.touched.email &&
            Object.keys(formik.errors).length > 0 &&
            !isResetPwd
        ) {
            console.log('c caaa')
            return true
        }

        if (!formik.dirty) {
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
        password: Yup.string().trim().required('Password is required.'),
    }

    const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const nameFieldSchema = {
        name: Yup.string()
            .trim()
            .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
                'Name must be one word without special character.\n Example: John.',
            )
            .min(3, 'Your name should be at least 3 characters long.')
            .max(18, 'Your name should not exceed 18 characters long.')
            .required('Name is required')
            .test(
                'noNumber',
                'Your name cannot contain any number.',
                async valueToTest => {
                    if (!valueToTest) {
                        return
                    }
                    if (number.some(x => valueToTest.includes(x))) {
                        return false
                    } else {
                        return true
                    }
                },
            ),
    }

    let validationSchema
    if (authMode === null || isResetPwd) {
        // if step 1 auth path or reset pwd mode just valid email
        validationSchema = mailFieldSchema
    } else if (!isnewUser) {
        // if pwd field appeared
        validationSchema = { ...mailFieldSchema, ...pwdFieldSchema }
    } else {
        // if is registering a new user
        validationSchema = {
            ...mailFieldSchema,
            ...pwdFieldSchema,
            ...nameFieldSchema,
        }
    }
    const validYupEmailLogger = Yup.object().shape({ ...validationSchema })

    let onSubmitHandler
    if (isResetPwd) {
        onSubmitHandler = async formValues => {
            const { email } = formValues
            console.log('formValues', formValues)
            const isNotUser = await checkEmailUniq(email.toLowerCase())
            if (isNotUser.result || isNotUser.provider !== 'credentials') {
                return
            }
            const sendPwdRecover = await sendPwdResetMail(email)
            if (!sendPwdRecover.success) {
                setResetPwdStatus(
                    'An error occured when sending you the email. Try again later.',
                )
                return
            }

            console.log('isUserNew', isNotUser)
            // const { password: newPwd } = formValues
            // const changeUserPwd = await editUserHandler(newPwd, userData._id)
        }
    } else {
        if (authMode === null) {
            // if still on STEP 1 login (no pwd field)
            onSubmitHandler = async formValues => {
                const { email } = formValues

                const isUserNew = await checkEmailUniq(email)
                // console.log('isUserNew', isUserNew)
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
                    const loginResult = await signIn('credentials', {
                        ...formValues,
                        redirect: false,
                    })

                    // if auth issue linked to creds...
                    if (!loginResult.ok && loginResult.error === 'CredentialsSignin') {
                        setAuthResult('Invalid credentials.')
                    } else {
                        router.push(
                            returnToURL
                                ? `${returnToURL}?${KEY}=${VALUE_LOGIN}`
                                : `${PATHS.HOME}?${KEY}=${VALUE_LOGIN}`,
                        )
                    }
                }
            } else {
                // register
                onSubmitHandler = async formValues => {
                    const { email, password, name } = formValues
                    // Trimming values except pwd
                    const formValuesFormatted = {
                        password,
                        email: email.trim(),
                        name: capitalize(name).trim(),
                    }
                    const userCreation = await addUserHandler(formValuesFormatted)
                    if (!userCreation.success) {
                        return setAuthResult(userCreation.result)
                    }

                    const login = await signIn('credentials', {
                        redirect: false,
                        email,
                        password,
                    })
                    console.log('login', login)
                    router.push(
                        returnToURL
                            ? `${returnToURL}?${KEY}=${VALUE_NEW_USER}`
                            : `${PATHS.HOME}?${KEY}=${VALUE_NEW_USER}`,
                    )
                }
            }
        }
    }

    const formik = useFormik({
        initialValues: { email: '', password: '', name: '' },
        onSubmit: onSubmitHandler,
        validationSchema: validYupEmailLogger,
    })

    const goBackReqHandler = param => {
        setAuthResult(null)
        if (isResetPwd) {
            return onForgotPassword()
        } else {
            onSelectEMail(null, null, null)
        }
        formik.touched.email = false
    }

    const mailRef = useRef(null)
    const nameRef = useRef(null)
    const pwdRef = useRef(null)
    const submitBtnRef = useRef(null)

    useInputAutoFocus(
        mailRef,
        nameRef,
        pwdRef,
        submitBtnRef,

        isResetPwd,
        authMode,
        isnewUser,
    )

    const whichNameBtn = () => {
        if (isResetPwd) {
            return 'Send me an e-mail'
        }
        if (authMode === null) {
            return 'Continue'
        }
        if (authMode === 'credentials' && isnewUser === true) {
            return 'Register'
        } else {
            return 'Login'
        }
    }

    // useEffect(() => {
    //     if (isResetPwd) {
    //         formik.errors = {}
    //         formik.isValid = true
    //     }
    // }, [isResetPwd])

    console.log('formik', formik)
    return (
        <>
            {authMode === 'credentials' && (
                <button
                    className={`${ARROW_TEXT_FS} mb-5 flex items-center gap-x-2 font-medium w-fit`}
                    onClick={goBackReqHandler}
                >
                    <BiArrowBack className={`${ARROW_ICON_FS}`} />
                    <span>Back</span>
                </button>
            )}
            <form noValidate onSubmit={formik.handleSubmit} className="space-y-4">
                {/* EMAIL FIELD */}
                <div>
                    {isResetPwd && <p className="mb-4 text-center">{resetPwdStatus}</p>}
                    <input
                        {...formik.getFieldProps('email')}
                        ref={mailRef}
                        disabled={formik.isSubmitting}
                        className={`
                            ${validStyling('email').border}
                            ${DISABLED_STYLE}
                            rounded-lg border w-full
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
                            ref={nameRef}
                            disabled={formik.isSubmitting}
                            className={`
                                ${validStyling('name').border}
                                ${DISABLED_STYLE}
                                rounded-lg border w-full
                        `}
                            type="text"
                            name="name"
                            placeholder="Name"
                        />
                        <div className="mt-1 whitespace-pre-wrap">
                            {validStyling('name').message}
                        </div>
                    </div>
                )}

                {/* PWD FIELD */}
                {authMode === 'credentials' && !isResetPwd && (
                    <div>
                        <div className="relative">
                            <input
                                {...formik.getFieldProps('password')}
                                ref={pwdRef}
                                disabled={formik.isSubmitting}
                                className={`
                                    ${validStyling('password').border}
                                    ${DISABLED_STYLE}  
                                    p-2 rounded-xl border w-full 
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
                                    <AiFillEyeInvisible className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                ) : (
                                    <AiFillEye className="absolute top-1/2 right-3 -translate-y-1/2 text-xl" />
                                )}
                            </button>
                        </div>
                        <div className="mt-1">{validStyling('password').message}</div>
                    </div>
                )}

                {!isResetPwd && (
                    <div className="text-primary text-center">{authResult}</div>
                )}

                {authMode === 'credentials' &&
                    !isnewUser &&
                    !isResetPwd &&
                    formik.submitCount > 1 &&
                    authResult === 'Invalid credentials.' && (
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className={`float-right text-secondary hover:underline`}
                        >
                            Forgot your password?
                        </button>
                    )}

                {/* SUBMIT FIELD */}
                <button
                    ref={submitBtnRef}
                    disabled={shouldBtnBeDisabled()}
                    className={`
                        ${BUTTON_FS} ${DISABLED_STYLE}
                        text-white font-bold py-3 bg-primary rounded-lg w-full
                        `}
                    type="submit"
                >
                    {whichNameBtn()}
                    {formik.isSubmitting && (
                        <Spinner size="sm" light={true} className="ml-2" />
                    )}
                </button>
            </form>
        </>
    )
}

export default EMailLogger
