import { addUserHandler } from "../../utils/APIfetchers";
import { useRouter } from 'next/router'


import { useFormik } from "formik"
import * as Yup from "yup";



const Register = ({ }) => {
    const router = useRouter()






    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .email('Must be a valid email')
            .required("Please enter an email from Yup!!"),

        name: Yup
            .string().trim()
            .min(2, "Your name should be at least 2 characters long!")
            .required("Please enter a name from Yup!!"),


        password: Yup
            .string().trim()
            .min(6, "Your password should be at least 6 characters long!")
            .required("Please enter a password from Yup!!"),

    });








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
        // Hash password here???

        // Combining values
        // const newObjectWithGeoJSON = { ...formValues, geometry, country };

        const userCreds = { name: name, email: email, password: password };

        await addUserHandler(userCreds)
        router.push("/spots/allSpots") //Navigate back to root
    }



    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup
    })



    // const handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     console.log('email', email)
    //     console.log('password', password)

    //     const userCreds = { name: name, email: email, password: password };

    //     addUserHandler(userCreds)
    // }




    // Logic to deicde to display erorrMsg or not (depending of if mistake and if touched before)
    const showValidErrorMsg = (field) => {
        // console.log('field', field)
        if (formik.errors[field] && formik.touched[field]) {
            return <span className="text-red-600">{formik.errors[field]}</span>
        }
    }


    console.log('formik', formik)
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
                    // value={email}
                    // onChange={e => setEmail(e.target.value)}
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

                    // value={name}
                    // onChange={e => setName(e.target.value)}
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

                    // value={password}
                    // onChange={e => setPassword(e.target.value)}
                    />
                    {
                        showValidErrorMsg("password")
                    }
                </div>




                {/*                 <button type="submit">Register with credential</button>
                <button onClick={(e) => registerUser(email, password, e)}>Register</button>
 */}

                <button
                    type="submit"> Register
                </button>
            </form>
        </>
    )
}

export default Register 