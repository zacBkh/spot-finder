
import LoginOrRegisterForm from "../../components/Forms/LoginOrRegisterForm";




const Register = ({ }) => {
/* 
    // Store login failure/success info
    const [status, setStatus] = useState(null);



    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        email: Yup
            .string().trim().lowercase()
            .required("Please enter an email from Yup!!")
            .email('Must be a valid email')


            // Async valid 
            // We only run the async validation if the field is not empty
            // otherwise, as on Yup validation is run on all field at every change, it was acting wird
            // maybe we can replacing by handling empty values directly in emailCheckerAsync.js
            .test(
                "checkEmailExist",
                "This email is already taken...",
                async (valueToTest) => {
                    if (!valueToTest) {
                        return false
                    } else {
                        return await checkEmailUniq(valueToTest)
                    }
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








    // Formik stuff 

    const initialValues = {
        email: "",
        name: "",
        password: ""
    };


    // Formik - Submit Fx 
    const onSubmitFormik = async (formValues) => {
        console.log('SUBMIT-formValues', formValues)

        const { email, password } = formValues;


        // const userCreds = { name: name, email: email, password: password };

        const userCreation = await addUserHandler(formValues)
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


    console.log('formik', formik)
    console.log('formik.values', formik.values)

 */
    return (

        <LoginOrRegisterForm
            action={"Register"}
            headerMsg={"Welcome, please register"}
            alternativeMsg={"Already have an account?"}
        />
        /*   <>
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
          </> */
    )
}

export default Register

