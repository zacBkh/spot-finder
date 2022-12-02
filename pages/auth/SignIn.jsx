import { useState, useEffect } from "react";


import LoginOrRegisterForm from "../../components/Forms/LoginOrRegisterForm"

import { useRouter } from 'next/router'
import Image from 'next/image'

import { sendPwdResetMail } from "../../utils/APIfetchers";


// For email verif
import { useFormik } from "formik"
import * as Yup from "yup";

import { checkEmailUniq } from "../../utils/APIfetchers";



import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


// Component
// Iterate over provider and display provider name
const SignIn = ({ }) => {

    // State handling which form to display (password reset or not)
    const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);

    const forgotPasswordHandler = () => {
        setIsForgotPasswordMode((prev) => !prev)
    }


    // User feedback
    const [status, setStatus] = useState(null);




    // Toast (if land on this page due to middleware redirection)
    const router = useRouter()
    const message = router.query.mustLogIn

    // To get the URL param for toast
    useEffect(() => {
        if (message) {
            toast.info(`You must be logged in to ${message}!`, {
                position: "top-center",
                // toastId: "mustBeLoggedIn", // prevent duplicates
            });
        }
    }, [router.isReady])





    // Yup stuff
    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .required("Please enter your email.")
            .email('It seems like this is not an email...')
    })

    // Formik stuff 
    const initialEmail = { email: "" }

    // Formik - Submit Fx 
    const onSubmitFormik = async ({ email }) => {
        // logic send email there
        console.log('email', email)

        // Check if email exists && if provider is not oAuth
        const isNotUser = await checkEmailUniq(email.toLowerCase())
        console.log('isNotUser', isNotUser)

        setStatus("If an account is linked to this address, you will receive an email to reset your password.")


        if (isNotUser.result === true) { return } // if no user has been found STOP

        if (isNotUser.provider !== "credentials") { return } // if user uses oAuth STOP


        const sendPwdRecover = await sendPwdResetMail(email)
        if (!sendPwdRecover.success) { setStatus("An error occured"); return } // if error in sending email occured STOP




    }


    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialEmail,
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup
    })


    console.log('formik', formik)
    console.log('formik.touched', formik.touched)


    // Should button be disabled?
    const shouldFormBeDisabled = () => {
        if (!formik.dirty) { return true }
        if (formik.errors.email) { return true }
        return false
    }


    // Logic to deliver valid error msg or red border color
    const validStyling = () => {
        if (formik.errors.email && formik.touched.email) {
            return { border: "border-2 border-rose-500", message: <span className="text-red-600">{formik.errors.email}</span> }
        } else { // if at least one field has been touched
            return { border: null, message: null }
        }
    }





    // If in login mode
    if (!isForgotPasswordMode) {
        return (
            <>
                <ToastContainer
                    autoClose={4000}
                    style={{ width: "400px" }}
                />


                <LoginOrRegisterForm
                    action={"Login"}
                    headerMsg={"Welcome back! Please log in"}
                    alternativeMsg={"Don't have an account?"}
                    onForgotPassword={forgotPasswordHandler}
                />
            </>
        )




        // If in forgot password
    } else {


        return (
            <>
                <section
                    className="bg-gray-50 mt-2 flex items-center justify-center gap-x-12">



                    <div
                        className="bg-gray-100 flex-ROW rounded-2xl shadow-lg max-w-md p-5 items-center">


                        {/* TEXT */}
                        <div className=" ">
                            <h2 className="font-bold text-2xl text-[#002D74]">Reset your password</h2>



                            {
                                formik.submitCount === 0 ?
                                    <div>
                                        <p className="text-xs mt-4 text-[#002D74]">Enter the email address associated with your account and we'll send you a link to reset your password. </p>
                                    </div>
                                    :
                                    <div>
                                        <p className="text-xs mt-4 text-[#002D74]">{status}</p>
                                    </div>
                            }




                            {/* FORM */}
                            {
                                formik.submitCount === 0 &&
                                <form
                                    onSubmit={formik.handleSubmit}
                                    // onSubmit={formik.resetForm()}
                                    className="flex flex-col gap-3">

                                    <div className="">
                                        <input
                                            {...formik.getFieldProps('email')}
                                            // onFocus={() => setisEmailFocused(true)}
                                            // onBlur={evt => emailFieldBlurHandler(evt)}
                                            className={`p-2 mt-8 rounded-xl border w-full ${validStyling().border}`}
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div>
                                        {
                                            validStyling().message
                                        }
                                    </div>


                                    <span className="text-center">
                                        {status}
                                    </span>


                                    <button
                                        disabled={shouldFormBeDisabled()}
                                        type="submit"
                                        className={`bg-[#002D74] rounded-xl text-white py-2 
                                enabled:hover:scale-105 duration-300 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                `}>Continue
                                    </button>
                                </form>
                            }

                        </div>


                        <div className="cursor-pointer hover:underline font-semibold text-center text-sm mt-4 text-[#002D74]">
                            <span onClick={forgotPasswordHandler}>Return to sign in</span>
                        </div>
                    </div>




                    <div className="hidden md:block  bg-gray-100  rounded-2xl shadow-lg max-w-3xl p-5">
                        {/* IMAGE */}
                        <Image
                            src="https://images.unsplash.com/photo-1516148066593-477d571e507f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            className=" w-1/2 rounded-2xl "
                            alt="Photographer half hero image"
                            width={400}
                            height={550}
                        />
                    </div>

                </section>


            </>
        )
    }

}

export default SignIn 