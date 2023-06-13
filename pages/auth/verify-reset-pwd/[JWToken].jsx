import ResetPassword from '../../../components/auth/reset-password'

import JWTVerifyer from '../../../utils/jwt-mail-tokens/verify-jwt'

import CustomErrorPage from '../../404'

// Get Server Side Props
export const getServerSideProps = async context => {
    const { JWToken } = context.params

    // Fx that does everything
    const resetPwdResult = await JWTVerifyer(JWToken)

    // Need to parse and stringify when return value from async op
    return {
        props: {
            reqResult: JSON.parse(JSON.stringify(resetPwdResult)),
        },
    }
}

// Component
const VerifryResetPwdReq = ({ reqResult }) => {
    console.log('reqResult', reqResult)
    if (!reqResult.success) {
        return (
            <CustomErrorPage
                contextErrHelper={
                    'Your token to reset your password could not be verified. Please try again.'
                }
            />
        )
    } else {
        return <ResetPassword userID={reqResult.userID} />
    }
}

export default VerifryResetPwdReq
