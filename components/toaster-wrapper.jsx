import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useSession } from 'next-auth/react'

import { TOAST_PARAMS } from '../constants/toast-query-params'
const {
    KEY,
    VALUE_LOGIN,
    VALUE_LOGOUT,
    VALUE_CREATED_SPOT_SUCCESS,
    VALUE_CREATED_SPOT_FAILURE,
    VALUE_EDITED_SPOT_SUCCESS,
    VALUE_DELETED_SPOT_SUCCESS,

    VALUE_DELETED_USER_SUCCESS,
    VALUE_REVIEWED_SPOT_SUCCESS,

    KEY_REQUIRE,
    VALUE_MUST_LOGIN,
    VALUE_MUST_NOT_BE_OWNER_ADD_VISIT,
    VALUE_ADD_SPOT_AS_VISITED_SUCCESS,
    VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS,

    VALUE_FEATURE_NOT_YET_AVAILABLE,

    VALUE_ADDED_PIC_SUCCESS,

    VALUE_MUST_LOGIN_TO_REVIEW,

    VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW,
    VALUE_MUST_NOT_HAVE_ALREADY_REVIEWED,
    VALUE_RESET_PWD_EMAIL_SENT_SUCCESS,
    VALUE_RESET_PWD_EMAIL_SENT_FAILURE,

    VALUE_EDIT_DESC_SUCCESS,
    VALUE_EDIT_DESC_FAILURE,
} = TOAST_PARAMS

import REDIRECT_QUERY_PARAMS from '../constants/redirect-query-params'
const {
    KEY_AUTH,
    VALUE_ALREADY_LOGGED_IN,
    VALUE_CREATE_SPOT,
    VALUE_ACCESS_PROFILE,
    KEY_AUTH_ERROR,
    VALUE_AUTH_ERROR,
    KEY_RETURN_TO,
} = REDIRECT_QUERY_PARAMS

import capitalize from '../utils/capitalize'

import { TOASTER_FS } from '../constants/responsive-fonts'

import { PATHS } from '../constants/URLs'

const Toaster = () => {
    const router = useRouter()
    const { isReady, query } = router

    const { data: session, status } = useSession()
    useEffect(() => {
        if (!isReady) {
            return
        }

        // User needs to be auth to mark spot as visited fx
        const toastLinkToLoginReturnTo = actionAttempted => (
            <>
                <Link
                    href={`${PATHS.AUTH}?${KEY_RETURN_TO}=${PATHS.SPOT}/${query.spotID}`}
                >
                    <a className="underline">Please login</a>
                </Link>
                <span>{actionAttempted}</span>
            </>
        )

        const queryString = router.query

        if (queryString[KEY] === VALUE_FEATURE_NOT_YET_AVAILABLE) {
            toast.info(
                `This feature is not available yet, but we are working on it! 💪🏼`,
                {
                    position: 'bottom-left',
                    toastId: 'featureNotYetAvailable',
                },
            )
        }

        if (status === 'authenticated') {
            const currentUserName = capitalize(session.user.name)
            // Only work with oAuth
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

            if (queryString[KEY] === VALUE_EDITED_SPOT_SUCCESS) {
                toast.success(`Your Spot has been successfully edited!`, {
                    position: 'bottom-left',
                    toastId: 'editedSpotSuccess',
                })
            }

            if (queryString[KEY] === VALUE_LOGIN) {
                toast.success(`Hi ${currentUserName}, welcome back!`, {
                    position: 'bottom-left',
                    toastId: 'loggedIn', // prevent duplicates
                })
            }

            if (queryString[KEY] === VALUE_CREATED_SPOT_SUCCESS) {
                toast.success(`You successfully created your Spot!`, {
                    position: 'bottom-left',
                    toastId: 'spotCreationSuccess', // prevent duplicates
                })
            }

            if (queryString[KEY] === VALUE_DELETED_SPOT_SUCCESS) {
                toast.success(`You successfully deleted your Spot.`, {
                    position: 'bottom-left',
                    toastId: 'spotDeletionSuccess', // prevent duplicates
                })
            }

            if (queryString[KEY] === VALUE_CREATED_SPOT_FAILURE) {
                toast.error(
                    <>
                        There has been an issue creating your Spot. <br /> Please try
                        again later.
                    </>,

                    {
                        position: 'bottom-left',
                        toastId: 'spotCreationFailure', // prevent duplicates
                    },
                )
            }

            // Display toast depending on query params
            if (queryString[KEY_AUTH] === VALUE_ALREADY_LOGGED_IN) {
                toast.info(`${currentUserName}, you are already logged in!`, {
                    position: 'bottom-left',
                    toastId: 'alreadyLoggedIn',
                })
            }

            if (queryString[KEY] === VALUE_ADD_SPOT_AS_VISITED_SUCCESS) {
                toast.success(`You marked this Spot as visited!.`, {
                    position: 'bottom-left',
                    toastId: 'markSpotAsVisited',
                })
            }

            if (queryString[KEY] === VALUE_ADDED_PIC_SUCCESS) {
                toast.success(`You successfully uploaded one image.`, {
                    position: 'bottom-left',
                })
            }

            if (queryString[KEY] === VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS) {
                toast.info(`You removed this Spot from your visited Spots!`, {
                    position: 'bottom-left',
                    toastId: 'removeSpotFromVisited',
                })
            }

            if (queryString[KEY_REQUIRE] === VALUE_MUST_NOT_BE_OWNER_ADD_VISIT) {
                toast.error(
                    `You cannot remove this Spot from your visited Spots since you created it.`,
                    {
                        position: 'bottom-left',
                        toastId: 'cannotRemoveFromVisited',
                    },
                )
            }

            if (queryString[KEY] === VALUE_REVIEWED_SPOT_SUCCESS) {
                toast.success(`You successfully reviewed the Spot, thank you! 🙏`, {
                    position: 'bottom-left',
                    toastId: 'reviewedSpot',
                })
            }

            if (queryString[KEY_REQUIRE] === VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW) {
                toast.error(
                    <>
                        You cannot review a Spot you created. <br />
                        Think about editing it.
                    </>,
                    {
                        position: 'bottom-left',
                        toastId: 'cannotReviewOwnedSpot',
                    },
                )
            }

            if (queryString[KEY_REQUIRE] === VALUE_MUST_NOT_HAVE_ALREADY_REVIEWED) {
                toast.error(
                    <>
                        You have already reviewed this Spot. <br />
                        Think about editing your review.
                    </>,
                    {
                        position: 'bottom-left',
                        toastId: 'cannotReviewAlreadyEditedSpot',
                    },
                )
            }

            if (queryString[KEY] === VALUE_RESET_PWD_EMAIL_SENT_SUCCESS) {
                toast.info(`An email to reset your password has been sent to you.`, {
                    position: 'bottom-left',
                    toastId: 'resetPwdEmailSentSuccess',
                })
            }
            if (queryString[KEY] === VALUE_RESET_PWD_EMAIL_SENT_FAILURE) {
                toast.error(
                    <>
                        There has been an issue trying to change your password. <br />
                        Please try again later.
                    </>,
                    {
                        position: 'bottom-left',
                        toastId: 'resetPwdEmailSentFailure',
                    },
                )
            }

            if (queryString[KEY] === VALUE_EDIT_DESC_FAILURE) {
                toast.error(
                    <>
                        There has been an issue trying to edit your description. <br />
                        Please try again later.
                    </>,
                    {
                        position: 'bottom-left',
                        toastId: 'editDescFailure',
                    },
                )
            }

            if (queryString[KEY] === VALUE_EDIT_DESC_SUCCESS) {
                toast.success('You successfully edited your description!', {
                    position: 'bottom-left',
                    toastId: 'editDescSuccess',
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

            if (queryString[KEY_REQUIRE] === VALUE_MUST_LOGIN) {
                toast.error(toastLinkToLoginReturnTo(' to mark this Spot as visited.'), {
                    position: 'bottom-left',
                    toastId: 'mustLogInToMarkAsVisited',
                })
            }

            if (queryString[KEY] === VALUE_DELETED_USER_SUCCESS) {
                toast.info(`You deleted your account. 💔`, {
                    position: 'bottom-left',
                    toastId: 'deletedAccount',
                })
            }

            if (router.query[KEY_REQUIRE] === VALUE_MUST_LOGIN_TO_REVIEW) {
                toast.error(toastLinkToLoginReturnTo(' to review this Spot.'), {
                    position: 'bottom-left',
                    toastId: 'loginToReviewSpot',
                })
            }
        }
    }, [router, isReady, status])

    return (
        <>
            <ToastContainer
                autoClose={4000}
                className={`${TOASTER_FS} text-form-color !w-screen sm:!w-fit sm:!min-w-[350px] !sm:max-w-[50vw] !bottom-0 !left-0 !mb-0 sm:ml-6 relative !z-[9999999]`}
            />
        </>
    )
}

export default Toaster
