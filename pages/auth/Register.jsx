import { addUserHandler, checkEmailUniq } from "../../utils/APIfetchers";
import { useState } from "react";

import { useFormik } from "formik"
import * as Yup from "yup";






import { signIn } from "next-auth/react"



const Register = ({ }) => {

    const [status, setStatus] = useState(null);



    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .email('Must be a valid email')
            .required("Please enter an email from Yup!!")

            // Async valid 
            .test(
                "checkEmailExist",
                "This email is already taken...",
                async (valueToTest) => {
                    return await checkEmailUniq(valueToTest)
                }
            ),

        name: Yup
            .string().trim()
            .min(2, "Your name should be at least 2 characters long!")
            .required("Please enter a name from Yup!!"),


        password: Yup
            .string().trim()
            .min(6, "Your password should be at least 6 characters long!")
            .required("Please enter a password from Yup!!"),

    });



    // .test(
    //         'test-id',
    //         'error message in case of fail',
    //         async function validateValue(value) {
    //             try {

    //                 // validation logic
    //                 return false; // or true as you see fit

    //             } catch (error) {

    //             }
    //         }
    // )






    // Formik stuff 

    // Formik - Setting initial value and name to link with "name" attribute of <input>
    const initialValues = {
        email: "",
        name: "",
        password: ""
    };


    // Formik - Submit Fx 
    const onSubmitFormik = async (formValues) => {
        console.log('SUBMIT-formValues', formValues)

        const { email, name, password } = formValues;


        const userCreds = { name: name, email: email, password: password };

        const userCreation = await addUserHandler(userCreds)
        console.log('userCreation', userCreation)

        if (!userCreation.success) {
            console.log('ERROR DUE TO --> ', userCreation.message)
            setStatus(userCreation.message)

        } else {
            console.log('SUCCESS -->', userCreation.message)


            // If registration OK, sign the user in and redirect to all spot
            await signIn('credentials', { email, password, callbackUrl: 'http://localhost:3008/spots/allSpots' });



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


    // console.log('formik', formik)
    console.log('formik.values', formik.values)
    return (
        <>
            <form
                onSubmit={formik.handleSubmit}>


                <div>
                    <label>Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="email@example.com"
                        {...formik.getFieldProps('email')}
                        autoFocus
                    />
                    {
                        showValidErrorMsg("email")
                    }

                </div>


                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...formik.getFieldProps('name')}
                    />
                    {
                        showValidErrorMsg("name")
                    }
                </div>



                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                    />
                    {
                        showValidErrorMsg("password")
                    }
                </div>





                <button
                    type="submit"> Register
                </button>


                <br />


                {
                    status &&
                    <p>{status}, try to&nbsp;
                        <span
                            className="underline cursor-pointer"
                            onClick={
                                () => signIn({ callbackUrl: 'http://localhost:3008/spots/allSpots' })
                            }>login
                        </span>
                    </p>
                }
            </form>
        </>
    )
}

export default Register

