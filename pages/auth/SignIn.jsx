import { useState } from "react"
import { getProviders } from "next-auth/react"

import { useRouter } from 'next/router'


import LoginOrRegisterForm from "../../components/Forms/LoginOrRegisterForm"


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
const SignIn = ({ }) => {



    // Store login failure/success info
    const [loginStatus, setloginStatus] = useState(null);

    // For toggler password visible
    const [isPwdVisible, setIsPwdVisible] = useState(false);



    // Yup stuff

    // Yup Validation Schema
    // const validationSchemaYup = Yup.object().shape({
    //     email: Yup
    //         .string().trim().lowercase()
    //         .required("Email is required")
    //         .email('It seems like this is not an email...'),


    //     password: Yup
    //         .string().trim()
    //         .required("Password is required"),
    // });




    // // Formik stuff 

    // const initialValues = {
    //     email: "",
    //     password: ""
    // };




    // // Formik - Submit Fx 
    // const onSubmitFormik = async (formValues) => {

    //     // https://next-auth.js.org/v3/getting-started/client#using-the-redirect-false-option
    //     const loginResult = await signIn(
    //         "credentials",
    //         {
    //             ...formValues,
    //             redirect: false,

    //         }
    //     )

    //     console.log('loginResult', loginResult)

    //     // if auth issue linked to creds...
    //     if (!loginResult.ok && loginResult.error === "CredentialsSignin") {
    //         // router.push(`/auth/error?error=${loginResult.error}`)
    //         setloginStatus("There has been an error verifying your credentials")

    //         // if auth OK...
    //     } else {
    //         router.push(`/spots/allSpots`)
    //     }
    // }

    // // Formik - object that tells initial values of form + submit & valid fx
    // const formik = useFormik({
    //     initialValues: initialValues,
    //     onSubmit: onSubmitFormik,
    //     validationSchema: validationSchemaYup
    // })



    // // Logic to deicde to display erorrMsg or not (depending of if mistake and if touched before)
    // const showValidErrorMsg = (field) => {
    //     // console.log('field', field)
    //     if (formik.errors[field] && formik.touched[field]) {
    //         return <span className="text-red-600">{formik.errors[field]}</span>
    //     }
    // }




    return (
        <>
            <LoginOrRegisterForm
                action={"Login"}
                headerMsg={"Welcome back! Please log in"}
                alternativeMsg={"Don't have an account?"}
            />
        </>
    )
}

export default SignIn 