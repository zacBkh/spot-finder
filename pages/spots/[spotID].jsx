import { useState, useRef, useEffect } from 'react'

import { authOptions } from '../api/auth/[...nextauth]'

import { unstable_getServerSession } from 'next-auth/next'

import { useRouter } from 'next/router'
import Image from 'next/image'

import {
    editSpotHandler,
    addOneVisitSpotHandler,
    addOneReview,
} from '../../services/mongo-fetchers'

import didUserVisited from '../../utils/Spots/didUserVisitedSpot'

import { GETSpotFetcherOne } from '../../utils/GETfetchers'

import MapShow from '../../components/Maps/MapShow'

import Review from '../../components/Reviews/Review'

import { TEXTAREA_INPUTS_FS } from '../../constants/responsive-fonts'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const {
    KEY,
    KEY_REQUIRE,
    VALUE_MUST_LOGIN,
    VALUE_MUST_NOT_BE_OWNER_ADD_VISIT,
    VALUE_ADD_SPOT_AS_VISITED_SUCCESS,
    VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS,
    VALUE_EDITED_SPOT_SUCCESS,
} = TOAST_PARAMS

import { HEADER_TITLE_FS } from '../../constants/responsive-fonts'

import { useFormik } from 'formik'
import { validTitleDesc } from '../../constants/validation-schemas'

import ButtonPhoto from '../../components/design/button-photo'
import SpotCardCTA from '../../components/cta-spot-card'

import UserFeedback from '../../components/new-forms/user-feedback-edit-spot'

import SpotCategory from '../../components/new-forms/spots/category-checkbox'

import SPOT_CATEGORIES from '../../constants/spot-categories'
import MissingImage from '../../components/image-off-placeholder'
import CountryDisplayer from '../../components/country-displayer'

export const getServerSideProps = async context => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID

        // Executing the fx that will fetch the precise Spot
        const resultFetchGETOne = await GETSpotFetcherOne(ID)

        if (!resultFetchGETOne) {
            return { notFound: true }
        }

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

    const {
        title,
        description,
        categories,
        geometry,
        country,
        author,
        visitors,
        images,
        reviews,
        _id: spotID,
    } = indivSpot

    const initialValuesEditSpot = {
        title,
        description,
        categories,
        coordinates: geometry.coordinates, // lng lat
        images,
    }

    const onSubmitEditSpot = async formValues => {
        if (!formik.dirty) {
            return
        }
        const { categories } = formValues
        formValues = { ...formValues, categories: categories.sort() }
        const spotEdition = await editSpotHandler(formValues, spotID)

        return router.push(
            { query: { spotID, [KEY]: VALUE_EDITED_SPOT_SUCCESS } },
            undefined,
            {
                shallow: true,
            },
        )
    }

    const formik = useFormik({
        initialValues: initialValuesEditSpot,
        onSubmit: onSubmitEditSpot,
        validationSchema: validTitleDesc,
    })

    const validStyling = field => {
        if (formik.errors[field]) {
            return {
                border: '!border !border-1 !border-primary',
                message: <>{formik.errors[field]}</>,
            }
        } else {
            return { border: '!border !border-1 !border-transparent', message: '' }
        }
    }

    // State that manages toggler + give info to API route whether to decrement or increment
    const didVisit = didUserVisited(visitors, currentUserID)
    const [didUserVisitSpot, setDidUserVisitSpot] = useState(didVisit)

    const router = useRouter()

    // Will call the fetcher for ADDING visit
    const handleAddVisit = async () => {
        console.log('handler ran')

        // If user not auth, send a toaster
        if (!currentUserID) {
            router.push(
                { query: { spotID, [KEY_REQUIRE]: VALUE_MUST_LOGIN } },
                undefined,
                { shallow: true },
            )
            return
        }

        /// if user is author, send toaster he can't add visit
        if (currentUserID === author._id) {
            router.push(
                { query: { spotID, [KEY_REQUIRE]: VALUE_MUST_NOT_BE_OWNER_ADD_VISIT } },
                undefined,
                { shallow: true },
            )
            return
        }

        await addOneVisitSpotHandler(currentUserID, spotID, didUserVisitSpot)

        if (!didUserVisitSpot) {
            router.push(
                { query: { spotID, [KEY]: VALUE_ADD_SPOT_AS_VISITED_SUCCESS } },
                undefined,
                { shallow: true },
            )
        } else {
            router.push(
                {
                    query: {
                        spotID,
                        [KEY]: VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS,
                    },
                },
                undefined,
                { shallow: true },
            )
        }

        console.log('handler ran aft')
        // did not visited this spot before, mark as visited
        setDidUserVisitSpot(prevState => !prevState)
    }

    // Review
    const [isReviewOpen, setIsReviewOpen] = useState(false)

    // Adding review + pushing its ID in Spot document
    const onReviewSubmit = async reviewValues => {
        const addRev = await addOneReview(spotID, currentUserID, reviewValues)

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
        console.log('YOU WANT TO REVIEW')
        // // If not logged in
        // if (!currentUserID) {
        //     // HELPERR
        //     toast.error(CustomToastWithLink(' to add a review to the spot'), {
        //         position: 'bottom-left',
        //         toastId: 'connectToAddReview',
        //     })
        //     return
        // }

        // // If author tries to comment
        // if (currentUserID === indivSpot.author) {
        //     toast.error(
        //         'You cannot review a Spot you created, think about editing its content!',
        //         {
        //             position: 'bottom-left',
        //             toastId: 'cannotCommentIfAuthor',
        //         },
        //     )
        //     return
        // }

        setIsReviewOpen(prev => !prev)
    }

    const titleRef = useRef(null)
    const descRef = useRef(null)

    // If user clicks on "edit your spot's xx"
    const startEditHandler = input => {
        if (input === 'title') {
            return titleRef.current.focus()
        }
        if (input === 'description') {
            return descRef.current.focus()
        }

        if (input === 'categories') {
            setIsInputEditable({ ...isInputEditable, categories: true }) // makes categories state editable manually
        }
    }

    // Will add true to the state
    const inputFocusHandler = input => {
        setIsInputEditable({ ...isInputEditable, [input]: true, categories: false }) // have to reset manually categories to false since no blur on checkbox
    }

    // If user leaves input
    const inputBlurHandler = (e, inputBlurred) => {
        formik.handleSubmit()
        formik.handleBlur
        setIsInputEditable({ ...isInputEditable, [inputBlurred]: false })
    }

    const shouldBeEditable = currentUserID === author._id

    const inputsSharedClass = `!no-underline focus:!outline outline-offset-2 ${
        shouldBeEditable ? 'hover:bg-tertiary focus:bg-tertiary' : 'bg-transparent'
    } p-1 pr-2`

    const [isMapVisible, setIsMapVisible] = useState(false)

    const mapToggleHandler = () => {
        setIsMapVisible(prev => !prev)
    }

    const categoriesToIterateOn = isInputEditable.categories
        ? SPOT_CATEGORIES
        : formik.values.categories

    const [txtareaHeight, setTxtareaHeight] = useState('')

    // Set text area state height onMount
    useEffect(() => {
        const height = descRef.current.scrollHeight
        setTxtareaHeight(height)
    }, [])

    // Change text area state on each keyUp
    const textareaTypeHandler = () => {
        setTxtareaHeight('auto')
    }

    // Listen for text area state change, and apply new scrollHeight on it
    useEffect(() => {
        setTxtareaHeight(descRef.current.scrollHeight)
    }, [txtareaHeight])
    return (
        <>
            <div className="px-4 md:px-9 xl:px-16 2xl:px-36 space-y-6">
                <div
                    className="grid-container grid grid-rows-[350px] lg:grid-rows-[400px] 2xl:grid-rows-[600px] grid-cols-3 gap-2 relative 
                       "
                >
                    <div className="gap-2 grid grid-rows-2 grid-cols-3 col-span-full relative">
                        <div className="relative row-span-2 col-span-2">
                            {isMapVisible ? (
                                <MapShow
                                    initialView={{
                                        longitude: 55.18,
                                        latitude: 25.07,
                                        zoom: 2,
                                    }}
                                    markerCoordinates={{
                                        Longitude: geometry.coordinates[0],
                                        Latitude: geometry.coordinates[1],
                                    }}
                                />
                            ) : (
                                <Image
                                    src={images[0]}
                                    alt="Picture"
                                    layout="fill"
                                    className="object-cover rounded-sm"
                                    priority={true}
                                    quality={10}
                                />
                            )}
                            <div className="absolute float-left top-[78%] sm:top-[76%] md:top-[87%] lg:top-[88%] left-[1.5%] flex flex-col md:flex-row gap-1  ">
                                <ButtonPhoto type={'showPhotos'} />
                                <ButtonPhoto
                                    isMapFullScreen={isMapVisible}
                                    onMapToggle={mapToggleHandler}
                                    type={'showMap'}
                                />
                            </div>
                        </div>

                        <div className="relative row-span-1 col-span-1">
                            {images[1] ? (
                                <Image
                                    src={images[1]}
                                    alt="Picture"
                                    layout="fill"
                                    className="object-cover rounded-sm"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={10}
                                />
                            ) : (
                                <MissingImage />
                            )}
                        </div>
                        <div className="relative row-span-1 col-span-1">
                            {images[2] ? (
                                <Image
                                    src={images[2]}
                                    alt="Picture"
                                    layout="fill"
                                    className="object-cover rounded-sm"
                                    quality={10}
                                />
                            ) : (
                                <MissingImage />
                            )}
                        </div>
                    </div>

                    <div className="row-span-1 col-span-full lg:col-span-2 h-fit text-form-color">
                        <div className="space-y-4">
                            <CountryDisplayer name={country.name} code={country.code} />
                            <div
                                className={`inputElem ${
                                    shouldBeEditable
                                        ? 'flex flex-col md:flex-row md:items-center justify-between gap-x-3 w-100'
                                        : 'w-100'
                                }`}
                            >
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
                                    disabled={!shouldBeEditable}
                                    className={`${HEADER_TITLE_FS} ${
                                        validStyling('title').border
                                    }
                                        ${inputsSharedClass} font-bold pr-2
                                        ${
                                            shouldBeEditable
                                                ? 'w-full md:w-[65%]'
                                                : 'w-full'
                                        }    
                                        `}
                                />
                                {shouldBeEditable ? (
                                    <UserFeedback
                                        input="title"
                                        isInputEditable={isInputEditable}
                                        formikErrors={formik.errors}
                                        onClickEdit={startEditHandler}
                                        text="Edit your Spot's title"
                                        errorMsg={validStyling('title').message}
                                    />
                                ) : null}
                            </div>
                            <div
                                className={`${
                                    shouldBeEditable
                                        ? 'flex flex-col md:flex-row md:items-center justify-between gap-x-3'
                                        : 'w-100'
                                }`}
                            >
                                <div className="flex flex-wrap gap-1 max-w-[65%]">
                                    {categoriesToIterateOn.map(category => (
                                        <SpotCategory
                                            key={category.name ?? category}
                                            icon={
                                                category.icon ??
                                                SPOT_CATEGORIES.find(
                                                    cat => cat.name === category,
                                                ).icon
                                            }
                                            value={
                                                isInputEditable.categories
                                                    ? category.name
                                                    : category
                                            }
                                            isInputEditable={isInputEditable}
                                            isSpotShowMode
                                            errorStying={validStyling('categories')}
                                            formikWizard={formik.getFieldProps(
                                                'categories',
                                            )}
                                            formikName="categories"
                                            catArray={formik.values.categories}
                                            shouldBeDisabled={
                                                !isInputEditable['categories']
                                            }
                                            onChangeCat={formik.handleSubmit}
                                        />
                                    ))}
                                </div>
                                {shouldBeEditable ? (
                                    <UserFeedback
                                        input="categories"
                                        isInputEditable={isInputEditable}
                                        formikErrors={formik.errors}
                                        onClickEdit={startEditHandler}
                                        text="Edit your Spot's categories"
                                        errorMsg={validStyling('categories').message}
                                    />
                                ) : null}
                            </div>

                            <div
                                className={`inputElem ${
                                    shouldBeEditable
                                        ? 'flex flex-col md:flex-row md:items-center justify-between gap-x-3 gap-y-1'
                                        : 'w-100'
                                }`}
                            >
                                <textarea
                                    style={{ height: txtareaHeight }}
                                    onKeyUp={textareaTypeHandler}
                                    onFocus={() => inputFocusHandler('description')}
                                    onBlur={e => inputBlurHandler(e, 'description')}
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    ref={descRef}
                                    readOnly={!isInputEditable.description}
                                    id={'description'}
                                    name={'description'}
                                    disabled={!shouldBeEditable}
                                    spellCheck="false"
                                    className={`box-border overflow-hidden resize-y ${
                                        validStyling('description').border
                                    }
                                        ${inputsSharedClass} ${TEXTAREA_INPUTS_FS} ${
                                        shouldBeEditable ? 'w-full md:w-[60%]' : 'w-full'
                                    }`}
                                ></textarea>

                                {shouldBeEditable ? (
                                    <UserFeedback
                                        input="description"
                                        isInputEditable={isInputEditable}
                                        formikErrors={formik.errors}
                                        onClickEdit={startEditHandler}
                                        text="Edit your Spot's description"
                                        errorMsg={validStyling('description').message}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col gap-y-4 px-4 py-5 shadow-md border border-1 mt-2 !h-fit">
                        <SpotCardCTA
                            nbOfVisits={visitors.length}
                            shouldBeEditable={shouldBeEditable}
                            author={author}
                            didUserVisitSpot={didUserVisitSpot}
                            onAddVisit={handleAddVisit}
                            spotID={spotID}
                            spotDetails={{ title, country: country.name, reviews }}
                        />
                    </div>
                </div>
                <div className="flex lg:hidden flex-col gap-y-4 px-4 py-5 shadow-md border border-1 mt-2 !h-fit">
                    <SpotCardCTA
                        nbOfVisits={visitors.length}
                        shouldBeEditable={shouldBeEditable}
                        author={author}
                        didUserVisitSpot={didUserVisitSpot}
                        onAddVisit={handleAddVisit}
                        spotID={spotID}
                        spotDetails={{ title, country: country.name, reviews }}
                    />
                </div>

                <div className="mt-96">
                    <a className="cursor-pointer" onClick={openReviewHandler}>
                        REVIEW THE SPOT
                    </a>
                    {isReviewOpen && (
                        <Review
                            isLoggedIn={currentUserID}
                            isAuthor={currentUserID === author}
                            onReviewSubmit={onReviewSubmit}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default ShowSpot
