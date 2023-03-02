import LoginOrRegisterForm from '../../components/Forms/LoginOrRegisterForm'

import { PATHS } from '../../constants/URLs'
const { DOMAIN } = PATHS

const Register = ({}) => {
    return (
        <LoginOrRegisterForm
            action={'Register'}
            headerMsg={'Welcome, please register'}
            alternativeMsg={'Already have an account?'}
        />
    )
}

export default Register
