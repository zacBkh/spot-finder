import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useSession } from 'next-auth/react'

import { TOAST_PARAMS } from '../constants/toast-query-params'
const { KEY, VALUE_LOGIN, VALUE_LOGOUT } = TOAST_PARAMS

import REDIRECT_QUERY_PARAMS from '../constants/redirect-query-params'
const {
    KEY_AUTH,
    VALUE_ALREADY_LOGGED_IN,
    VALUE_CREATE_SPOT,
    VALUE_ACCESS_PROFILE,
    KEY_AUTH_ERROR,
    VALUE_AUTH_ERROR,
} = REDIRECT_QUERY_PARAMS
import capitalize from '../utils/capitalize'

const Toaster = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    useEffect(() => {
        if (!router.isReady) {
            return
        }

        const queryString = router.query

        if (status === 'authenticated') {
            const currentUserName = capitalize(session.user.name.split(' ')[0])
            console.log('session', session)

            if (session.isNewUser) {
                toast.success(
                    <>
                        Hi {currentUserName}, welcome to Spot Finder! <br /> We are happy
                        to have you onboard.
                    </>,
                    {
                        position: 'bottom-left',
                        toastId: 'newUser',
                    },
                )
                return
            }

            if (queryString[KEY] === VALUE_LOGIN) {
                console.log('session et QS')

                toast.success(`Hi ${currentUserName}, welcome back!`, {
                    position: 'bottom-left',
                    toastId: 'loggedIn', // prevent duplicates
                })
            }

            // Display toast depending on query params
            if (queryString[KEY_AUTH] === VALUE_ALREADY_LOGGED_IN) {
                toast.info(`${currentUserName}, you are already logged in!`, {
                    position: 'bottom-left',
                    toastId: 'alreadyLoggedIn',
                })
            }
        } else {
            if (queryString[KEY] === VALUE_LOGOUT) {
                toast.info(`You successfully logged out.`, {
                    position: 'bottom-left',
                    toastId: 'loggedOut',
                })
            }

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

            if (router.query[KEY_AUTH_ERROR] === VALUE_AUTH_ERROR) {
                toast.error(`Try to login with another provider: Facebook or Google.`, {
                    position: 'bottom-left',
                    toastId: 'oAuthError',
                })
            }
        }
    }, [router, router.isReady, status])

    return (
        <>
            <ToastContainer autoClose={4000} style={{ width: '400px' }} />
        </>
    )
}

export default Toaster
