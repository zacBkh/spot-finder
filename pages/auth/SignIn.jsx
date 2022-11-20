import { getProviders } from "next-auth/react"



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