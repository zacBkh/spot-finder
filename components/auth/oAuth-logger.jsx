import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { signIn } from 'next-auth/react'

import { useState } from 'react'
import capitalize from '../../utils/capitalize'

import { DISABLED_STYLE } from '../../constants/disabled-style'
import { TOAST_PARAMS } from '../../constants/toast-query-params'
const { KEY, VALUE_LOGIN } = TOAST_PARAMS

import Spinner from '../spinner'
import { PATHS } from '../../constants/URLs'

import { BUTTON_FS, OAUTH_LOGO_FS } from '../../constants/responsive-fonts'

const OAuthLogger = ({ returnToURL, provider, bgColor, txtColor, onSelectOAuth }) => {
    const [isLoading, setIsLoading] = useState(false)
    const signInHandler = async () => {
        setIsLoading(true)
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
                aria-label={`Log in with ${provider}`}
                disabled={isLoading}
                onClick={signInHandler}
                className={`${bgColor} ${txtColor} ${BUTTON_FS} 
                ${DISABLED_STYLE} w-full font-bold py-3 px-5 rounded-lg flex items-center justify-center`}
            >
                <div>
                    {provider === 'facebook' ? (
                        <BsFacebook className={`mr-2 ${OAUTH_LOGO_FS}`} />
                    ) : (
                        <FcGoogle
                            className={`bg-white rounded-full mr-2 ${OAUTH_LOGO_FS}`}
                        />
                    )}
                </div>
                <div>Login with {capitalize(provider)}</div>
                {isLoading && <Spinner color={'border-t-secondary'} className="ml-2" />}
            </button>
        </>
    )
}

export default OAuthLogger
