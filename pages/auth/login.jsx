import { useState, useEffect } from 'react'

import Divider from '../../components/auth/divider'
import OAuthLogger from '../../components/auth/oAuth-logger'
import EMailLogger from '../../components/auth/email-logger'
import { useRouter } from 'next/router'

import Image from 'next/image'

import REDIRECT_QUERY_PARAMS from '../../constants/redirect-query-params'
const { KEY_RETURN_TO } = REDIRECT_QUERY_PARAMS

const { KEY_AUTH_ERROR, VALUE_AUTH_ERROR } = REDIRECT_QUERY_PARAMS

const Login = ({}) => {
    const router = useRouter()
    const { isReady, query } = router

    // authMode --> null || 'credentals' || 'oAuth'
    // value --> email of the user || 'facebook' || 'google'
    const [authDetails, setAuthDetails] = useState({
        authMode: null,
        value: null,
        isNew: null,
    })

    const [oAuthError, setOAuthError] = useState(null)

    const { authMode, value: authValue, isNew } = authDetails

    const selectAuthModeHandler = (authMode, value, isNew) => {
        setAuthDetails({ authMode, value, isNew })
        setOAuthError(null)
    }

    const [isResetPwd, setIsResetPwd] = useState(false)

    const showEmailLogger = !authMode || authMode == 'credentials'
    const showFbLogger = !authMode || authValue === 'facebook'
    const showGoogleLogger = !authMode || authValue === 'google'

    const forgotPasswordHandler = () => {
        setIsResetPwd(prevState => !prevState)
    }

    useEffect(() => {
        if (query[KEY_AUTH_ERROR] === VALUE_AUTH_ERROR) {
            setOAuthError('You already signed in with another provider.')
        }
    }, [isReady, query])

    return (
        <>
            <div className="flex justify-center gap-y-6 max-w-2xl mx-auto items-stretch gap-x-4">
                <div className="w-1/2 p-6 bg-tertiary align-middle rounded-lg">
                    <div className="flex flex-col justify-center gap-y-6 h-full">
                        {showEmailLogger && (
                            <EMailLogger
                                returnToURL={isReady ? query[KEY_RETURN_TO] : null}
                                authMode={authMode}
                                isnewUser={isNew}
                                onSelectEMail={selectAuthModeHandler}
                                onForgotPassword={forgotPasswordHandler}
                                isResetPwd={isResetPwd}
                            />
                        )}
                        {!authMode && <Divider />}

                        <div className="text-primary text-center">{oAuthError}</div>

                        <>
                            {showFbLogger && (
                                <OAuthLogger
                                    returnToURL={isReady ? query[KEY_RETURN_TO] : null}
                                    provider={'facebook'}
                                    bgColor={'bg-blue-facebook'}
                                    txtColor={'text-white'}
                                    onSelectOAuth={selectAuthModeHandler}
                                />
                            )}
                            {showGoogleLogger && (
                                <OAuthLogger
                                    returnToURL={isReady ? query[KEY_RETURN_TO] : null}
                                    provider={'google'}
                                    bgColor={'bg-[#4285f4]'}
                                    txtColor={'text-white'}
                                    onSelectOAuth={selectAuthModeHandler}
                                />
                            )}
                        </>
                    </div>
                </div>

                <div className="w-1/2 hidden md:block ">
                    <Image
                        src="https://images.unsplash.com/photo-1516148066593-477d571e507f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        className="rounded-lg"
                        alt="Photographer half hero image"
                        width={350}
                        height={500}
                    />
                </div>
            </div>
        </>
    )
}

export default Login