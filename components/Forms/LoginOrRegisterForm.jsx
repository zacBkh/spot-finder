import { useState } from "react"

import { addUserHandler, checkEmailUniq } from "../../utils/APIfetchers";

import { useFormik } from "formik"
import * as Yup from "yup";

import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


import { useRouter } from 'next/router'

import Link from "next/link"



import { signIn } from "next-auth/react"


// This form component is used for both Registration & Login
// The action can be "Registration" || "Login" and depending on this, it will render and validate or not some fields + the submit fx will change

const LoginOrRegisterForm = ({ action, headerMsg, alternativeMsg }) => {

    const router = useRouter()


    // For toggler password visible
    const [isPwdVisible, setIsPwdVisible] = useState(false);

    // Store login failure/success info
    const [actionStatus, setActionStatus] = useState(null);

    // Check if email field is focused, if yes will trigger email async valid, otherwise no (perf)
    // const [isEmailFocused, setisEmailFocused] = useState(null);



    // Yup stuff

    // To disable validation on certain fields if on register mode or login mode
    let nameField
    let password2Field
    let passwordTest
    if (action === "Register") {
        nameField = {
            name: Yup
                .string().trim()
                .min(2, "Your name should be at least 2 characters long!")
                .required("Name is required")
        };

        passwordTest =
        {
            password: Yup
                .string().trim()
                .min(6, "Your password should be at least 6 characters long!")
                .required("Password is required"),
        };

        password2Field = {
            password2Field: Yup
                .string().trim()
                .required("Please confirm your password")
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        };

    } else {
        nameField = null
        passwordTest =
        {
            password: Yup
                .string().trim()
                .required("Password is required"),
        };
        password2Field = null
    }
    console.log('nameField', nameField)




    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .required("Email is required")
            .email('It seems like this is not an email...')

            // Async valid 
            // We only run the async validation if the field is not empty
            // otherwise, as on Yup validation is run on all field at every change, it was acting wird
            // maybe we can replacing by handling empty values directly in emailCheckerAsync.js
            .test(
                "checkEmailExist",
                "This email is already taken...",
                async (valueToTest) => {
                    if (action === "Register") {

                        console.log('valueToTest', valueToTest)

                        if (!valueToTest) { // if no value in email field
                            return

                        } else {
                            console.log("1111111")
                            const isUniq = await checkEmailUniq(valueToTest)
                            return await isUniq.result
                        }

                    } else {
                        return true
                    }
                }
            ),


        ...nameField,

        ...passwordTest,

        ...password2Field,

    });




    // Formik stuff 
    let initialValues
    if (action === "Register") {
        initialValues = {
            email: "",
            name: "",
            password: "",
            password2Field: ""
        };

    } else {
        initialValues = {
            email: "",
            password: "",
        };
    }


    // Formik - Submit Fx 
    const onSubmitFormik = async (formValues) => {

        const { email, password } = formValues;

        if (action === "Register") { // REGISTER MODE

            console.log('Register - FormValues -->', formValues)

            const userCreation = await addUserHandler(formValues)
            console.log('userCreation', userCreation)

            if (!userCreation.success) {
                console.log('ERROR DUE TO --> ', userCreation.message)
                setActionStatus(userCreation.message)

            } else {
                console.log('SUCCESS -->', userCreation.message)


                // If registration OK, sign the user in and redirect to all spot
                await signIn('credentials', { email, password, callbackUrl: 'http://localhost:3008/spots/allSpots' });
            }


        } else { // LOGIN MODE
            console.log('THIS IS LOGIN MODE CHILL-----')

            // https://next-auth.js.org/v3/getting-started/client#using-the-redirect-false-option
            const loginResult = await signIn(
                "credentials",
                {
                    ...formValues,
                    redirect: false,

                }
            )

            console.log('loginResult', loginResult)

            // if auth issue linked to creds...
            if (!loginResult.ok && loginResult.error === "CredentialsSignin") {

                setActionStatus("Invalid Credentials")

                // if auth OK...
            } else {
                router.push(`/spots/allSpots`)
            }
        }
    }





    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup
    })




    // Logic to deliver valid error msg or red border color
    const validStyling = (field) => {

        if (formik.errors === {}) { // if nothing happenned, no styling warning...
            return { border: null, message: null }

        } else { // if at least one field has been touched

            if (formik.errors[field] && formik.touched[field]) { // if there is an error on the passed field...
                return { border: "border-2 border-rose-500", message: <span className="text-red-600">{formik.errors[field]}</span> }

            } else { // if no error on this specific field...
                return { border: null, message: null }
            }

        }
    }


    console.log('formik', formik)
    console.log('formik.values', formik.values)



    return (
        <>
            <section
                className="bg-gray-50 mt-2 flex items-center justify-center">

                {/* login container */}
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">


                    {/* form */}
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">{action}</h2>
                        <p className="text-xs mt-4 text-[#002D74]">{headerMsg} </p>

                        {/* () => setIsUnderEdition((prevState) => !prevState) */}

                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col gap-4">

                            <div className="">
                                <input
                                    {...formik.getFieldProps('email')}
                                    // onFocus={() => setisEmailFocused(true)}
                                    // onBlur={evt => emailFieldBlurHandler(evt)}
                                    className={`p-2 mt-8 rounded-xl border w-full ${validStyling("email").border}`}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <div>
                                    {
                                        validStyling("email").message
                                    }
                                </div>
                            </div>



                            {/* Only shows if registration mode */}
                            {
                                action === "Register" &&
                                <div className="">
                                    <input
                                        {...formik.getFieldProps('name')}
                                        className={`p-2 rounded-xl border w-full ${validStyling("name").border}`}
                                        type="text"
                                        name="name"
                                        placeholder="What's your name?"
                                    />
                                    <div>
                                        {
                                            validStyling("name").message
                                        }
                                    </div>
                                </div>
                            }


                            {/* Password */}
                            <div>
                                <div
                                    className="relative">
                                    <input
                                        {...formik.getFieldProps('password')}
                                        className={`p-2 rounded-xl border w-full ${validStyling("password").border}`}
                                        type={isPwdVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <button
                                        onClick={
                                            () => setIsPwdVisible((prev) => !prev)
                                        }
                                        type="button"
                                        className="">
                                        {
                                            isPwdVisible ?
                                                <AiFillEyeInvisible
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl "
                                                />
                                                :
                                                <AiFillEye
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl"
                                                />

                                        }
                                    </button>
                                </div>
                                {
                                    validStyling("password").message
                                }
                            </div>


                            {/* Password confirmation */}
                            {
                                action === "Register" &&
                                <div>
                                    <div
                                        className="relative">
                                        <input
                                            {...formik.getFieldProps('password2Field')}
                                            className={`p-2 rounded-xl border w-full ${validStyling("password2Field").border}`}
                                            type={isPwdVisible ? "text" : "password"}
                                            name="password2Field"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            onClick={
                                                () => setIsPwdVisible((prev) => !prev)
                                            }
                                            type="button">
                                            {
                                                isPwdVisible ?
                                                    <AiFillEyeInvisible
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-xl"
                                                    />
                                                    :
                                                    <AiFillEye
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-xl"
                                                    />
                                            }
                                        </button>
                                    </div>
                                    {
                                        validStyling("password2Field").message
                                    }
                                </div>
                            }




                            {/* lOGIN OR REGISTER */}
                            <button
                                type="submit"
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">{action}
                            </button>
                        </form>


                        <span className="text-red-600">{actionStatus}</span>



                        {
                            action === "Login" &&
                            <div className=" hover:underline text-center text-xs mt-4 text-[#002D74]">
                                <a href="#">Forgot your password?</a>
                            </div>
                        }

                        {/*      {
                            action === "Login" && */}
                        <>
                            <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
                                <hr className="border-gray-400" />
                                <p className="text-center text-sm">OR</p>
                                <hr className="border-gray-400" />
                            </div>




                            {/* Google */}
                            <button
                                onClick={() => signIn("google")}
                                className="bg-white border py-2 w-full rounded-xl mt-3 flex justify-center items-center text-sm hover:scale-105 duration-300">
                                <FcGoogle
                                    className="mr-2 text-2xl" />
                                Login with Google
                            </button>


                            {/* Facebook */}
                            <button
                                onClick={() => signIn("facebook")}
                                className="bg-white border py-2 w-full rounded-xl mt-3 flex justify-center items-center text-sm hover:scale-105 duration-300">
                                <BsFacebook
                                    className="mr-2 text-2xl text-blue-facebook" />
                                Login with Facebook
                            </button>




                        </>






                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>{alternativeMsg}</p>

                            <Link
                                href={`/auth/${action === "Register" ? "SignIn" : "Register"}`}>
                                <button
                                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">{action === "Register" ? "Login" : "Register"}
                                </button>
                            </Link>

                        </div>
                    </div>

                    {/* image */}
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginOrRegisterForm