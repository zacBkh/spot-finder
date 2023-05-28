import { useState, useRef } from 'react'
import { useFormik } from 'formik'

import { BiArrowBack } from 'react-icons/bi'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { PATHS } from '../../../constants/URLs'

import { TOAST_PARAMS } from '../../../constants/toast-query-params'
const { KEY, VALUE_LOGIN } = TOAST_PARAMS

import { DISABLED_STYLE } from '../../../constants/disabled-style'

import SearchCountry from './search-country'
import SelectProfilePic from './profile-pic-field'

import {
    BUTTON_FS,
    SMALL_TEXT_FS,
    ARROW_ICON_FS,
    ARROW_TEXT_FS,
} from '../../../constants/responsive-fonts'
import { addUserHandler, checkEmailUniq } from '../../../services/mongo-fetchers'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import {
    validMail,
    validMailPwd,
    validFullUser,
} from '../../../constants/validation-schemas'

import capitalize from '../../../utils/capitalize'
import Spinner from '../../spinner'

import useInputAutoFocus from '../../../hooks/useInputAutoFocus'

import { sendPwdResetMail } from '../../../services/mongo-fetchers'

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
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)

    const [resetPwdStatus, setResetPwdStatus] = useState(
        'If an account is linked to this addres, we will send you an e-mail to reset your password.',
    )

    // Store login failure/success info
    const [authResult, setAuthResult] = useState(null)

    const shouldBtnBeDisabled = () => {
        if (disableSubmitBtn) {
            return true
        }

        if (formik.isSubmitting) {
            return true
        }
        if (Object.keys(formik.errors).length > 0 && !isResetPwd) {
            return true
        }

        if (!formik.dirty) {
            return true
        }

        if (formik.values.password === '' && authMode === 'credentials') {
            // hacky way but formik does not update after state update
            return true
        }
        return false
    }

    const validStyling = field => {
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: 'border-2 border-primary',
                message: (
                    <span className={`${SMALL_TEXT_FS} !text-primary`}>
                        {formik.errors[field]}
                    </span>
                ),
            }
        } else {
            return { border: '', message: '' }
        }
    }

    let finalValidationSchema
    if (authMode === null || isResetPwd) {
        // if step 1 auth path or reset pwd mode just valid email
        finalValidationSchema = validMail
    } else if (!isnewUser) {
        // if pwd field appeared
        finalValidationSchema = validMailPwd
    } else {
        // if is registering a new user
        finalValidationSchema = validFullUser
    }

    let onSubmitHandler
    if (isResetPwd) {
        onSubmitHandler = async formValues => {
            const { email } = formValues
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
        }
    } else {
        if (authMode === null) {
            // if still on STEP 1 login (no pwd field)
            onSubmitHandler = async formValues => {
                const { email } = formValues

                const isUserNew = await checkEmailUniq(email)
                if (isUserNew.result) {
                    onSelectEMail('credentials', email, true)
                    formik.touched.name = false
                } else {
                    onSelectEMail('credentials', email, false)
                }
                formik.touched.password = false
                formik.touched.country = false
            }
        } else {
            if (!isnewUser) {
                // login
                onSubmitHandler = async formValues => {
                    const loginResult = await signIn('credentials', {
                        ...formValues,
                        redirect: false,
                    })

                    setDisableSubmitBtn(true)

                    // if auth issue linked to creds...
                    if (!loginResult.ok && loginResult.error === 'CredentialsSignin') {
                        setAuthResult('Invalid credentials.')
                        setDisableSubmitBtn(false)
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
                    const { email, password, name, country: countryName } = formValues
                    // Trimming values except pwd
                    const formValuesFormatted = {
                        password,
                        country: { name: countryName, code: userCountryCode },
                        email: email.trim(),
                        name: capitalize(name).trim(),
                    }
                    setDisableSubmitBtn(true)

                    const userCreation = await addUserHandler(formValuesFormatted)
                    if (!userCreation.success) {
                        return setAuthResult(userCreation.result)
                    }

                    const login = await signIn('credentials', {
                        redirect: false,
                        email,
                        password,
                    })
                    router.push(
                        returnToURL
                            ? `${returnToURL}?${KEY}=${VALUE_LOGIN}`
                            : `${PATHS.HOME}?${KEY}=${VALUE_LOGIN}`,
                    )
                }
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            country: '',
            profilePic: '',
        },
        onSubmit: onSubmitHandler,
        validationSchema: finalValidationSchema,
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
    const pwdRef = useRef(null)
    const nameRef = useRef(null)
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

    const whichNameBtnAndUserInfo = () => {
        if (isResetPwd) {
            return { button: 'Send me an e-mail', stepGuide: '' }
        }
        if (authMode === null) {
            return { button: 'Continue', stepGuide: '' }
        }
        if (authMode === 'credentials' && isnewUser === true) {
            return {
                button: 'Register',
                stepGuide: 'Register to explore special features for members only.',
            }
        } else {
            return {
                button: 'Login',
                stepGuide:
                    'Welcome back! Please log in to continue exploring the best Spots around you. 📍',
            }
        }
    }

    const [userCountryCode, setUserCountryCode] = useState('')

    const selectCountryHandler = selectedCountry => {
        console.log('selectedCountry++', selectedCountry)
        formik.setFieldValue('country', selectedCountry.name)
        setUserCountryCode(selectedCountry.code)
    }

    const pictureSelectHandler = selectedPic => {
        formik.setFieldValue('profilePic', selectedPic)
    }

    console.log('formik.touched', formik.touched)
    console.log('formik.values', formik.values)
    console.log('formik.ERRORS', formik.errors)
    return (
        <>
            {authMode === 'credentials' && (
                <button
                    className={`${ARROW_TEXT_FS}  mb-5 flex items-center gap-x-2 font-medium w-fit`}
                    onClick={goBackReqHandler}
                >
                    <BiArrowBack className={`${ARROW_ICON_FS}`} />
                    <span>Back</span>
                </button>
            )}
            <span className="text-form-color text-center">
                {whichNameBtnAndUserInfo().stepGuide}
            </span>
            <form noValidate onSubmit={formik.handleSubmit} className="space-y-4">
                {/* EMAIL FIELD */}
                <div>
                    {isResetPwd && <p className="mb-4 text-center">{resetPwdStatus}</p>}
                    <input
                        title={
                            authMode === 'credentials'
                                ? 'Press back to edit your email address.'
                                : undefined
                        }
                        {...formik.getFieldProps('email')}
                        ref={mailRef}
                        disabled={formik.isSubmitting || authMode === 'credentials'}
                        className={`
                            ${validStyling('email').border}
                            ${DISABLED_STYLE}
                            rounded-lg border w-full
                            p-2
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
                                p-2
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

                {/* COUNTRY FIELD */}
                {isnewUser === true && (
                    <SearchCountry
                        formik={formik}
                        onCountrySelect={selectCountryHandler}
                        validData={validStyling('country')}
                    />
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

                {/* PROFILE PIC FIELD */}
                {isnewUser === true && (
                    <SelectProfilePic
                        formik={formik}
                        onPictureSelect={pictureSelectHandler}
                    />
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
                    {whichNameBtnAndUserInfo().button}
                    {formik.isSubmitting || disableSubmitBtn ? (
                        <Spinner color={'border-t-secondary'} className="ml-2" />
                    ) : (
                        ''
                    )}
                </button>
            </form>
        </>
    )
}

export default EMailLogger
