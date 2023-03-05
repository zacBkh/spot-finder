import { useState } from 'react'
import { BsTypeH1 } from 'react-icons/bs'

// import decodeTokenResetPwd from "../../../utils/JWTMailToken/helpers/ResetPwd/decodeToken"

import ResetPwdForm from '../../../components/Forms/ResetPwdForm'

import JWTVerifyer from '../../../utils/JWTMailToken/helpers/ResetPwd/JWTVerifyer'

// Get Server Side Props
export const getServerSideProps = async context => {
    const { JWToken } = context.params

    // Fx that does everything
    // Will return
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
    if (!reqResult.success) {
        return <h1> {reqResult.result}</h1>
    } else {
        return <ResetPwdForm userData={reqResult.result} />
    }
}

export default VerifryResetPwdReq
