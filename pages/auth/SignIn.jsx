import { useState } from "react"
import { getProviders, signIn } from "next-auth/react"

import { useRouter } from 'next/router'
import Link from "next/link"



import { useFormik } from "formik"
import * as Yup from "yup";


import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';



// GSP
export const getServerSideProps = async (context) => {

    // Removing credentials from the proivder list since we will create a specific form
    const providers = await getProviders()
    delete providers.credentials;


    return {
        props: {
            providers: providers,
        },
    }
}









// Component
// Iterate over provider and display provider name
const SignIn = ({ providers }) => {

    const router = useRouter()


    // Store login failure/success info
    const [loginStatus, setloginStatus] = useState(null);

    // For toggler password visible
    const [isPwdVisible, setIsPwdVisible] = useState(false);



    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .email('It seems like this is not an email...')
            .required("Email is required"),


        password: Yup
            .string().trim()
            .required("Password is required"),
    });




    // Formik stuff 

    const initialValues = {
        email: "",
        password: ""
    };




    // Formik - Submit Fx 
    const onSubmitFormik = async (formValues) => {

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
            // router.push(`/auth/error?error=${loginResult.error}`)
            setloginStatus("There has been an error verifying your credentials")

            // if auth OK...
        } else {
            router.push(`/spots/allSpots`)
        }
    }

    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup
    })



    // Logic to deicde to display erorrMsg or not (depending of if mistake and if touched before)
    const showValidErrorMsg = (field) => {
        // console.log('field', field)
        if (formik.errors[field] && formik.touched[field]) {
            return <span className="text-red-600">{formik.errors[field]}</span>
        }
    }



    // Gathering all prodivers name in a list to iterate over
    const providersList = Object.values(providers)


    return (
        <>


            <section
                className="bg-gray-50 min-h-screen flex items-center justify-center">

                {/* login container */}
                <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">


                    {/* form */}
                    <div class="md:w-1/2 px-8 md:px-16">
                        <h2 class="font-bold text-2xl text-[#002D74]">Login</h2>
                        <p class="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                        <form
                            onSubmit={formik.handleSubmit}
                            class="flex flex-col gap-4">

                            <div className="">
                                <input
                                    {...formik.getFieldProps('email')}
                                    class="p-2 mt-8 rounded-xl border w-full"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <div>
                                    {
                                        showValidErrorMsg("email")
                                    }
                                </div>
                            </div>
                            <div>


                                <div
                                    class="relative">
                                    <input
                                        {...formik.getFieldProps('password')}
                                        class="p-2 rounded-xl border w-full"
                                        type={isPwdVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
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
                                        {/*  <AiFillEye
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-xl"
                                        /> */}
                                    </button>
                                </div>
                                {
                                    showValidErrorMsg("password")
                                }
                            </div>






                            <button
                                class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login
                            </button>
                        </form>

                        {loginStatus}


                        <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr class="border-gray-400" />
                            <p class="text-center text-sm">OR</p>
                            <hr class="border-gray-400" />
                        </div>





                        {/* Google */}
                        <button
                            onClick={() => signIn("google")}
                            class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                            <FcGoogle
                                className="mr-2 text-2xl" />
                            Login with Google
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={() => signIn("facebook")}
                            class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                            <BsFacebook
                                className="mr-2 text-2xl text-blue-facebook" />
                            Login with Facebook
                        </button>








                        <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                            <a href="#">Forgot your password?</a>
                        </div>

                        <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Don't have an account?</p>

                            <Link
                                href="/auth/Register">
                                <button
                                    class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register
                                </button>
                            </Link>

                        </div>
                    </div>

                    {/* image */}
                    <div class="md:block hidden w-1/2">
                        <img class="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
                    </div>
                </div>
            </section>










            {/* <div id="oAuthForm">
                {
                    providersList.map((provider) => (
                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))
                }
            </div>





            <div id="credsForm">
                <form
                    onSubmit={formik.handleSubmit} >


                    <label>
                        Email
                        <input
                            {...formik.getFieldProps('email')}
                            placeholder="email@example.com"
                            name="email"
                            type="text"
                            autoFocus
                        />
                        {
                            showValidErrorMsg("email")
                        }
                    </label>

                    <br />

                    <label>
                        Password
                        <input
                            {...formik.getFieldProps('password')}
                            placeholder="your password"
                            name="password"
                            type="password"
                        />
                        {
                            showValidErrorMsg("password")
                        }
                    </label>


                    <br />


                    <button
                        type="submit">Sign in
                    </button>

                    <br />
                    {loginStatus}

                </form>
            </div> */}
        </>
    )
}

export default SignIn 