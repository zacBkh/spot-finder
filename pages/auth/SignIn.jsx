import { useState } from "react"
import { getProviders, signIn } from "next-auth/react"

import { useRouter } from 'next/router'


import { useFormik } from "formik"
import * as Yup from "yup";

import { credsLoginRequest } from "../../utils/APIfetchers";



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



    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .email('It seems like this is not an email...')
            .required("Please enter an email from Yup!!"),


        password: Yup
            .string().trim()
            .required("Please enter a password from Yup!!"),
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


            <div id="oAuthForm">
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
            </div>
        </>
    )
}

export default SignIn 