import { useState } from 'react'
import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Spinner from '../spinner'

import { FORM_VALID_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'
import { BUTTON_FS } from '../../constants/responsive-fonts'
import { doublePwdFieldSchema } from '../../constants/validation-schemas'
const ResetPassword = ({}) => {
    const [isPwdVisible, setIsPwdVisible] = useState(false)

    // Formik - Submit Fx
    const onSubmitFormik = async formValues => {
        console.log('YOU RESET YOUR Password')

        // const { password: newPwd } = formValues

        // const changeUserPwd = await editUserHandler(newPwd, userData._id)

        // const { email } = changeUserPwd.result
        // console.log('changeUserPwd -->', changeUserPwd)

        // // For toaster notif
        // localStorage.setItem('toast', 'resetPwd')

        // await signIn('credentials', {
        //     email,
        //     password: newPwd,
        //     callbackUrl: HOME,
        // })
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
                    <span className={`${FORM_VALID_FS} !text-primary `}>
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
        // if (formik.touched.email && Object.keys(formik.errors).length > 0) {
        //     return true
        // }
        return false
    }

    return (
        <>
            <form noValidate onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-y-4">
                    <div>
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
                        <span className="mt-1">{validStyling('password').message}</span>
                    </div>

                    <div>
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
                        <span className="mt-1">{validStyling('password2').message}</span>
                    </div>

                    <button
                        type="submit"
                        disabled={shouldBtnBeDisabled()}
                        className={`
                            ${BUTTON_FS} ${DISABLED_STYLE}
                            mt-10
                            text-white font-bold py-3 bg-primary rounded-lg w-full
                    `}
                    >
                        {/* {whichNameBtn()} */}
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
