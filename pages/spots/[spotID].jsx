import { useState, useRef, useEffect } from 'react'

import { authOptions } from '../api/auth/[...nextauth]'

import { unstable_getServerSession } from 'next-auth/next'
// import { getServerSession } from "next-auth/next";

import { useRouter } from 'next/router'

import {
    editSpotHandler,
    deleteSpotHandler,
    addOneVisitSpotHandler,
    addOneReview,
} from '../../services/mongo-fetchers'

import didUserVisited from '../../utils/Spots/didUserVisitedSpot'

import { GETSpotFetcherOne } from '../../utils/GETfetchers'

import SpotAction from '../../components/SpotAction'

import Link from 'next/link'

import Toggler from '../../components/Toggler'

import MapShow from '../../components/Maps/MapShow'

import Review from '../../components/Reviews/Review'

import { PATHS } from '../../constants/URLs'
const { HOME } = PATHS

import { FORM_VALID_FS } from '../../constants/responsive-fonts'

// -----------

import { BUTTON_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'

import { useFormik } from 'formik'
import { validTitleDesc } from '../../constants/validation-schemas'

import UserFeedback from '../../components/new-forms/user-feedback-edit-spot'

export const getServerSideProps = async context => {
    //   const session = await getServerSession(context.req, context.res, authOptions);
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    console.log('sessio589n', session)

    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID

        // Executing the fx that will fetch the precise Spot
        const resultFetchGETOne = await GETSpotFetcherOne(ID)

        return {
            props: {
                indivSpot: resultFetchGETOne,
                currentUserID: session ? session.userID : null,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true,
        }
    }
}

const ShowSpot = ({ indivSpot, currentUserID }) => {
    // --------

    const [isInputEditable, setIsInputEditable] = useState({
        title: false,
        description: false,
        categories: false,
        coordinates: false,
    })

    const lookUp = {
        0: 'title',
        1: 'description',
        2: 'categories',
        3: 'coordinates',
    }

    const initialValuesEditSpot = {
        title: indivSpot.title,
        description: indivSpot.description,
        categories: indivSpot.categories,
        coordinates: indivSpot.geometry.coordinates, // lng lat
    }

    const onSubmitEditSpot = async formValues => {
        console.log('formValues', formValues)
    }

    const formik = useFormik({
        initialValues: initialValuesEditSpot,
        onSubmit: onSubmitEditSpot,
        validationSchema: validTitleDesc,
    })

    const validStyling = field => {
        console.log('field++', field)
        if (formik.errors[field]) {
            return {
                border: '!border !border-1 !border-primary',
                message: (
                    <span className={`${FORM_VALID_FS} !text-primary `}>
                        {formik.errors[field]}
                    </span>
                ),
            }
        } else {
            return { border: '', message: '' }
        }
    }

    console.log('formik', formik)

    // State that manages toggler + give info to API route whether to decrement or increment
    const didVisit = didUserVisited(indivSpot.visited.visitors, currentUserID)
    const [didUserVisitSpot, setDidUserVisitSpot] = useState(didVisit)

    // Did this to update in real time nb of visits when user toggle
    const nbVisit = indivSpot.visited.numberOfVisits
    const [nbOfVisit, setNbOfVisit] = useState(nbVisit)

    // To tell to API route which spot are we talking about -- can replace by info coming from GSP ?
    const router = useRouter()

    const { _id: spotID } = indivSpot

    // Will call the fetcher for Edit located in utils - params come from children
    const handleEdit = async editedEnteredData => {
        await editSpotHandler(editedEnteredData, spotID)

        // For toaster notif
        localStorage.setItem('toast', 'editSpot')

        router.push(HOME) //Navigate back to root
    }

    // // This will be rendered in the toast
    const CustomToastWithLink = actionNotAllowed => (
        <>
            <Link href="/auth/SignIn">
                <a className="text-[#3498db] underline">Please login</a>
            </Link>
            <span>{actionNotAllowed}</span>
        </>
    )

    // Will call the fetcher for ADDING visit
    const handleAddVisit = async () => {
        const addVisit = await addOneVisitSpotHandler(
            currentUserID,
            spotID,
            didUserVisitSpot,
        )

        // if failure in add success and user not logged in...
        if (!addVisit.success && !currentUserID) {
            toast.error(CustomToastWithLink(' to mark this spot as verified'), {
                position: 'bottom-left',
                toastId: 'connectToMarkVisitedSuccess',
            })

            // if success...
        } else {
            if (!didUserVisitSpot) {
                toast.success('You marked this spot as visited!', {
                    position: 'bottom-left',
                    toastId: 'connectToMarkVisitedSuccess',
                })
            } else {
                toast.success('You removed this spot from visited!', {
                    position: 'bottom-left',
                    toastId: 'connectToMarkVisitedSuccess',
                })
            }

            setDidUserVisitSpot(prevState => !prevState)
            setNbOfVisit(prevState => (didUserVisitSpot ? prevState - 1 : prevState + 1))
        }
    }

    // Will call the fetcher for DELETE located in utils
    const handleDelete = async () => {
        await deleteSpotHandler(spotID)

        // For toaster notif
        localStorage.setItem('toast', 'deleteSpot')

        router.push(HOME) //Navigate back to root
    }

    // If owner of camp, don't display toggle
    let shouldTogglerDisplay
    if (!currentUserID) {
        // if not logged in
        shouldTogglerDisplay = true
    } else if (currentUserID === indivSpot.author) {
        // if logged in and author
        shouldTogglerDisplay = false
    } else {
        // if logged in and NOT author
        shouldTogglerDisplay = true
    }

    // Review
    const [isReviewOpen, setIsReviewOpen] = useState(false)

    // Adding review + pushing its ID in Spot document
    const onReviewSubmit = async reviewValues => {
        console.log('reviewValuesfrom parent !!', reviewValues)
        const addRev = await addOneReview(spotID, currentUserID, reviewValues)
        console.log('addRev', addRev)

        if (!addRev.success) {
            console.log('ERROR ADDING A REVIEW', addRev.result)
        }

        setIsReviewOpen(false)

        toast.success('Thanks for the comment!', {
            position: 'bottom-left',
            toastId: 'commentSuccess',
        })
    }

    const openReviewHandler = () => {
        // If not logged in
        if (!currentUserID) {
            // HELPERR
            toast.error(CustomToastWithLink(' to add a review to the spot'), {
                position: 'bottom-left',
                toastId: 'connectToAddReview',
            })
            return
        }

        // If author tries to comment
        if (currentUserID === indivSpot.author) {
            toast.error(
                'You cannot review a Spot you created, think about editing its content!',
                {
                    position: 'bottom-left',
                    toastId: 'cannotCommentIfAuthor',
                },
            )
            return
        }

        setIsReviewOpen(prev => !prev)
    }

    const titleRef = useRef(null)
    const descRef = useRef(null)

    // If user clicks on "edit your spot's xx"
    const startEditHandler = input => {
        input === 'title' ? titleRef.current.focus() : descRef.current.focus()
    }

    // Will add true to the state
    const inputFocusHandler = input => {
        console.log('You want to focus on', input)
        setIsInputEditable({ ...isInputEditable, [input]: true })
    }

    // If user leaves input
    const inputBlurHandler = input => {
        console.log('You want to leave', input)
        formik.handleBlur
        setIsInputEditable({ ...isInputEditable, [input]: false })
    }

    const inputsSharedClass =
        'spotEditorElems !no-underline focus:!outline outline-offset-2 focus:bg-tertiary '

    const shouldSubmitBtnBeDisabled = () => {
        if (!formik.dirty) {
            return true
        }

        if (Object.keys(formik.errors).length) {
            return true
        }

        if (formik.isSubmitting) {
            return true
        }
    }

    const btnClassName = `${BUTTON_FS} ${DISABLED_STYLE}
    text-white font-bold py-3 bg-primary rounded-lg w-full !mt-6`
    return (
        <>
            <MapShow
                initialView={{
                    longitude: 55.18,
                    latitude: 25.07,
                    zoom: 2,
                }}
                markerCoordinates={{
                    Longitude: indivSpot.geometry.coordinates[0],
                    Latitude: indivSpot.geometry.coordinates[1],
                }}
            />
            <form onSubmit={formik.handleSubmit} className="space-y-6 mx-auto w-fit">
                <div className="spotEditWrapper flex justify-center items-center mt-6 gap-x-3 w-fit">
                    <input
                        onFocus={() => inputFocusHandler('title')}
                        onBlur={() => inputBlurHandler('title')}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        ref={titleRef}
                        readOnly={!isInputEditable.title}
                        id={'title'}
                        name={'title'}
                        spellCheck="false"
                        className={`${validStyling('title').border}
                        ${inputsSharedClass}`}
                    />
                    <UserFeedback
                        input="title"
                        isInputEditable={isInputEditable}
                        formikErrors={formik.errors}
                        onClickEdit={startEditHandler}
                        text="Edit your Spot's title"
                        errorMsg={validStyling('title').message}
                    />
                </div>

                {/* TEXT AREA */}
                <div className="flex justify-center items-center mt-6 gap-x-3 spotEditWrapper">
                    <textarea
                        onFocus={() => inputFocusHandler('description')}
                        onBlur={() => inputBlurHandler('description')}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        ref={descRef}
                        readOnly={!isInputEditable.description}
                        id={'description'}
                        name={'description'}
                        spellCheck="false"
                        rows={3}
                        cols={40}
                        className={`${validStyling('description').border}
                          ${inputsSharedClass}`}
                    ></textarea>

                    <UserFeedback
                        input="description"
                        isInputEditable={isInputEditable}
                        formikErrors={formik.errors}
                        onClickEdit={startEditHandler}
                        text="Edit your Spot's description"
                        errorMsg={validStyling('description').message}
                    />
                </div>
                <button
                    className={btnClassName}
                    disabled={shouldSubmitBtnBeDisabled()}
                    type="submit"
                >
                    Submit your changes
                </button>
            </form>
            <p>Country: {indivSpot.country.name}</p>
            <p> This Spot has been visited {nbOfVisit} times </p>
            {shouldTogglerDisplay && (
                <Toggler onToggle={handleAddVisit} didUserVisitSpot={didUserVisitSpot} />
            )}
            <p>CATEGORIES: {indivSpot.categories.join(', ')} </p>
            <p>LATITUDE: {indivSpot.geometry.coordinates[1]}</p>
            <p>LONGITUDE: {indivSpot.geometry.coordinates[0]}</p>
            <a className="cursor-pointer" onClick={openReviewHandler}>
                REVIEW THE SPOT
            </a>
            {isReviewOpen && (
                <Review
                    isLoggedIn={currentUserID}
                    isAuthor={currentUserID === indivSpot.author}
                    onReviewSubmit={onReviewSubmit}
                />
            )}
            {/* Spot Edition */}
            {currentUserID && currentUserID === indivSpot.author && (
                <SpotAction
                    action={'edition'}
                    message1={'Click here to Edit the Spot'}
                    message2={'Cancel Spot Edition'}
                    onSpotAction={handleEdit}
                    previousValues={indivSpot}
                />
            )}
            {/* Spot Deletion */}
            {
                // status === "authenticated" &&
                currentUserID === indivSpot.author && (
                    <SpotAction
                        action={'deletion'}
                        message1={'Click here to Delete the Spot'}
                        message2={'Do you really want to delete the Spot?'}
                        onSpotAction={handleDelete}
                        previousValues={indivSpot}
                    />
                )
            }
        </>
    )
}

export default ShowSpot
