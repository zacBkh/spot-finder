import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { signIn } from 'next-auth/react'

import capitalize from '../../utils/capitalize'
import { TOAST_PARAMS } from '../../constants/toast-query-params'

import { BUTTON_FS } from '../../constants/responsive-fonts'

const OAuthLogger = ({ provider, callbackURL, bgColor, txtColor, onSelectOAuth }) => {
    const callbackURLWithToast = `${callbackURL}${TOAST_PARAMS.LOGIN}`

    const signInHandler = param => {
        signIn(provider, { callbackUrl: callbackURLWithToast })
        onSelectOAuth('oAuth', provider)
    }
    return (
        <>
            <button
                onClick={signInHandler}
                className={`${bgColor} ${txtColor} ${BUTTON_FS} w-full font-bold py-3 px-5 rounded-lg flex justify-center`}
            >
                {provider === 'facebook' ? (
                    <BsFacebook className="mr-2 text-2xl" />
                ) : (
                    <FcGoogle className="bg-white rounded-full mr-2 text-2xl" />
                )}
                Login with {capitalize(provider)}
            </button>
        </>
    )
}

export default OAuthLogger
