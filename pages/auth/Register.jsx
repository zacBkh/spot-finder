
import LoginOrRegisterForm from "../../components/Forms/LoginOrRegisterForm";




const Register = ({ }) => {


    return (

        <LoginOrRegisterForm
            action={"Register"}
            headerMsg={"Welcome, please register"}
            alternativeMsg={"Already have an account?"}
        />
    )
}

export default Register

