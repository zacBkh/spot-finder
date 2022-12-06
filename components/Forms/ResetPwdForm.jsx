import { useFormik } from "formik"
import * as Yup from "yup";

import { useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


import Image from 'next/image'

import capitalize from "../../utils/capitalize";

import { editUserHandler } from "../../utils/APIfetchers";

import { signIn } from "next-auth/react"


import PATHS from "../../utils/URLs";
const { home } = PATHS


// Component receives full userData
const ResetPwdForm = ({ userData }) => {


    // For toggler password visible
    const [isPwdVisible, setIsPwdVisible] = useState(false);




    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        password: Yup
            .string().trim()
            .min(6, "Your password should be at least 6 characters long!")
            .required("Password is required"),


        password2: Yup
            .string().trim()
            .required("Please confirm your password")
            .oneOf([Yup.ref('password'), null], 'Passwords must match')

    })



    // Formik stuff 
    const initialPwds = { password: "", password2: "" }


    // Formik - Submit Fx 
    const onSubmitFormik = async (formValues) => {
        console.log('formValues', formValues)
        const { password: newPwd } = formValues;



        const changeUserPwd = await editUserHandler(newPwd, userData._id)

        const { email } = changeUserPwd.result
        console.log('changeUserPwd -->', changeUserPwd)

        // For toaster notif
        localStorage.setItem("toast", "resetPwd");

        await signIn('credentials', { email, password: newPwd, callbackUrl: domain });
    }



    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialPwds,
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup
    })


    // Logic to deliver valid error msg or red border color
    const validStyling = (field) => {
        if (formik.errors[field] && formik.touched[field]) {
            return { border: "border-2 border-rose-500", message: <span className="text-red-600">{formik.errors[field]}</span> }
        } else { // if no error on this specific field...
            return { border: null, message: null }
        }
    }



    // Should button be disabled?
    const shouldFormBeDisabled = () => {
        if (!formik.dirty) { return true }
        if (Object.keys(formik.errors).length !== 0) { return true }
        return false
    }


    console.log('formik', formik)


    return (
        <>

            <section
                className="bg-gray-50 mt-2 flex items-center justify-center">

                {/* login container */}
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">



                    <div className="md:w-1/2 px-8 md:px-4">

                        <h2 className="font-bold text-2xl text-[#002D74] mb-5">Welcome {capitalize(userData.name)}!</h2>

                        <h2 className="font-bold text-2xl text-[#002D74]">Reset your password below</h2>
                        <p className="text-xs mt-4 text-[#002D74]">Enter your new credentials</p>


                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col gap-4 mt-6">


                            {/* Password */}
                            < div >
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
                            </div >


                            {/* Password confirmation */}
                            <div>
                                <div
                                    className="relative">
                                    <input
                                        {...formik.getFieldProps('password2')}
                                        className={`p-2 rounded-xl border w-full ${validStyling("password2").border}`}
                                        type={isPwdVisible ? "text" : "password"}
                                        name="password2"
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
                                    validStyling("password2").message
                                }
                            </div>


                            {/* lOGIN OR REGISTER */}
                            <button
                                disabled={shouldFormBeDisabled()}
                                type="submit"
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 mb-2
                                disabled:opacity-50 disabled:cursor-not-allowed">Reset
                            </button>

                        </form>



                    </div>
                    {/* image */}
                    <div className="md:block hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1516148066593-477d571e507f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            className=" w-1/2 rounded-2xl"
                            alt="Photographer half hero image"
                            width={450}
                            height={600}
                        />
                    </div>
                </div>

            </section>

        </>
    )
}

export default ResetPwdForm