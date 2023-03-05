import { useState, useEffect } from 'react'

import { BiArrowBack } from 'react-icons/bi'

import Divider from '../../components/auth/divider'
import OAuthLogger from '../../components/auth/oAuth-logger'
import EMailLogger from '../../components/auth/email-logger'
import { useRouter } from 'next/router'

import Image from 'next/image'

import REDIRECT_QUERY_PARAMS from '../../constants/redirect-query-params'
const { KEY_AUTH, VALUE_CREATE_SPOT, VALUE_ACCESS_PROFILE, KEY_RETURN_TO } =
    REDIRECT_QUERY_PARAMS
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ({}) => {
    const router = useRouter()
    console.log('router.query', router.query)

    useEffect(() => {
        if (router.query[KEY_AUTH] === VALUE_CREATE_SPOT) {
            toast.error(`You must be authenticated to create a new Spot.`, {
                position: 'bottom-left',
                toastId: 'alreadyLoggedIn',
            })
        }

        if (router.query[KEY_AUTH] === VALUE_ACCESS_PROFILE) {
            toast.error(`You must be authenticated to view your profile.`, {
                position: 'bottom-left',
                toastId: 'mustBeAuthToViewProfile',
            })
        }
    }, [router.isReady, router.query])

    // authMode : "credentials" || "oAuth"
    // value : email of user or provider
    const [authDetails, setAuthDetails] = useState({
        authMode: null,
        value: null,
        isNew: null,
    })

    const { authMode, value: authValue, isNew } = authDetails

    const selectAuthModeHandler = (authMode, value, isNew) => {
        setAuthDetails({ authMode, value, isNew })
    }

    const showEmailLogger = !authMode || authMode == 'credentials'
    const showOAuthLogger = !authMode || authMode === 'oAuth'

    return (
        <>
            <div className="flex justify-center gap-y-6 max-w-2xl mx-auto items-stretch gap-x-4">
                <div className="w-1/2 p-6 flex flex-col justify-center gap-y-6 bg-secondary align-middle rounded-lg">
                    {showEmailLogger && (
                        <EMailLogger
                            returnToURL={
                                router.isReady ? router.query[KEY_RETURN_TO] : null
                            }
                            authMode={authMode}
                            isnewUser={isNew}
                            onSelectEMail={selectAuthModeHandler}
                        />
                    )}
                    {!authMode && <Divider />}

                    {showOAuthLogger && (
                        <>
                            {authValue === 'facebook' ||
                                (!authMode && (
                                    <OAuthLogger
                                        returnToURL={
                                            router.isReady
                                                ? router.query[KEY_RETURN_TO]
                                                : null
                                        }
                                        provider={'facebook'}
                                        bgColor={'bg-blue-facebook'}
                                        txtColor={'text-white'}
                                        onSelectOAuth={selectAuthModeHandler}
                                    />
                                ))}
                            {authValue === 'google' ||
                                (!authMode && (
                                    <OAuthLogger
                                        returnToURL={
                                            router.isReady
                                                ? router.query[KEY_RETURN_TO]
                                                : null
                                        }
                                        provider={'google'}
                                        bgColor={'bg-[#4285f4]'}
                                        txtColor={'text-white'}
                                        onSelectOAuth={selectAuthModeHandler}
                                    />
                                ))}
                        </>
                    )}
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
