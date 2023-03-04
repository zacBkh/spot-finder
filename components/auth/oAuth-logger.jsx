import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import capitalize from '../../utils/capitalize'
import { TOAST_PARAMS } from '../../constants/toast-query-params'
const { KEY, VALUE_LOGIN, VALUE_NEW_USER } = TOAST_PARAMS

import { PATHS } from '../../constants/URLs'

import { BUTTON_FS } from '../../constants/responsive-fonts'

const OAuthLogger = ({ returnToURL, provider, bgColor, txtColor, onSelectOAuth }) => {
    const router = useRouter()

    // const callbackURLWithToast = `${callbackURL}?${KEY}=${VALUE_LOGIN}`
    const signInHandler = async param => {
        await onSelectOAuth('oAuth', provider)

        await signIn(provider, {
            callbackUrl: returnToURL
                ? `${returnToURL}?${KEY}=${VALUE_LOGIN}`
                : `${PATHS.HOME}?${KEY}=${VALUE_LOGIN}`,
        })
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
