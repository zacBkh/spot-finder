import { useState, useRef } from 'react'

import { authOptions } from '../api/auth/[...nextauth]'

import { unstable_getServerSession } from 'next-auth/next'

import { useRouter } from 'next/router'
import Image from 'next/image'

import {
    editSpotHandler,
    deleteSpotHandler,
    addOneVisitSpotHandler,
    addOneReview,
} from '../../services/mongo-fetchers'

import didUserVisited from '../../utils/Spots/didUserVisitedSpot'

import { GETSpotFetcherOne } from '../../utils/GETfetchers'

import MapShow from '../../components/Maps/MapShow'

import Review from '../../components/Reviews/Review'

import { PATHS } from '../../constants/URLs'
const { HOME } = PATHS

import { TEXTAREA_INPUTS_FS } from '../../constants/responsive-fonts'

import TemporaryImgUrls from '../../constants/temporary-imgs-urls'

import { TOAST_PARAMS } from '../../constants/toast-query-params'
const {
    KEY,
    KEY_REQUIRE,
    VALUE_MUST_LOGIN,
    VALUE_MUST_NOT_BE_OWNER,
    VALUE_ADD_SPOT_AS_VISITED_SUCCESS,
    VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS,
    VALUE_EDITED_SPOT_SUCCESS,
    VALUE_DELETED_SPOT_SUCCESS,
} = TOAST_PARAMS

import { BiEdit } from 'react-icons/bi'
import { MdOutlineRateReview } from 'react-icons/md'

import { BUTTON_FS, HEADER_TITLE_FS } from '../../constants/responsive-fonts'
import { DISABLED_STYLE } from '../../constants/disabled-style'
import DividerDesign from '../../components/design/divider'

import { useFormik } from 'formik'
import { validTitleDesc } from '../../constants/validation-schemas'

import ButtonPhoto from '../../components/design/button-photo'
import ButtonSpotCard from '../../components/design/button-spot-card'
import Toggler from '../../components/toggler-visited-spot'
import SpotGradeDisplayer from '../../components/grade-spot-displayer'
import SpotterProfilePreview from '../../components/spotter-profile-preview'

import UserFeedback from '../../components/new-forms/user-feedback-edit-spot'

import SpotCategory from '../../components/new-forms/spots/category-checkbox'

import SPOT_CATEGORIES from '../../constants/spot-categories'
import MissingImage from '../../components/image-off-placeholder'

export const getServerSideProps = async context => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID

        // Executing the fx that will fetch the precise Spot
        const resultFetchGETOne = await GETSpotFetcherOne(ID)
        console.log('resultFetchGETOne', resultFetchGETOne)

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
        visited,
        images,
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
        console.log('changedcat')
        console.log('formik.dirty', formik.dirty)
        console.log('formik.dirty', formValues)

        if (!formik.dirty) {
            return
        }
        const { categories } = formValues
        formValues = { ...formValues, categories: categories.sort() }
        const spotEdition = await editSpotHandler(formValues, spotID)

        return router.push(
            { query: { ...router.query, [KEY]: VALUE_EDITED_SPOT_SUCCESS } },
            undefined,
            { shallow: true },
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

    console.log('formik ', formik)
    console.log('formik.values ', formik.values)

    // State that manages toggler + give info to API route whether to decrement or increment
    const didVisit = didUserVisited(visited.visitors, currentUserID)
    const [didUserVisitSpot, setDidUserVisitSpot] = useState(didVisit)

    // Did this to update in real time nb of visits when user toggle
    const nbVisit = visited.numberOfVisits
    const [nbOfVisit, setNbOfVisit] = useState(nbVisit)

    const router = useRouter()
    console.log('router.query', router.query)

    // Will call the fetcher for Edit located in utils - params come from children
    const handleEdit = async editedEnteredData => {
        await editSpotHandler(editedEnteredData, spotID)

        router.push(HOME) //Navigate back to root
    }

    // Will call the fetcher for ADDING visit
    const handleAddVisit = async () => {
        // If user not auth, send a toaster
        if (!currentUserID) {
            console.log('allo', 111)
            router.push(
                { query: { ...router.query, [KEY_REQUIRE]: VALUE_MUST_LOGIN } },
                undefined,
                { shallow: true },
            )
            return
        }

        /// if user is author, send toaster
        if (currentUserID === author._id) {
            router.push(
                { query: { ...router.query, [KEY_REQUIRE]: VALUE_MUST_NOT_BE_OWNER } },
                undefined,
                { shallow: true },
            )
            return
        }

        await addOneVisitSpotHandler(currentUserID, spotID, didUserVisitSpot)

        // if did not visited this spot before, mark as visited
        if (!didUserVisitSpot) {
            router.push(
                { query: { ...router.query, [KEY]: VALUE_ADD_SPOT_AS_VISITED_SUCCESS } },
                undefined,
                { shallow: true },
            )
        } else {
            router.push(
                {
                    query: {
                        ...router.query,
                        [KEY]: VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS,
                    },
                },
                undefined,
                { shallow: true },
            )
        }

        setDidUserVisitSpot(prevState => !prevState)
        setNbOfVisit(prevState => (didUserVisitSpot ? prevState - 1 : prevState + 1))
        //     }
    }

    // Will call the fetcher for DELETE located in utils
    const handleDelete = async () => {
        await deleteSpotHandler(spotID)
        router.push(
            HOME,
            {
                query: {
                    ...router.query,
                    [KEY]: VALUE_DELETED_SPOT_SUCCESS,
                },
            },
            undefined,
            { shallow: true },
        )
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
        console.log('You want to focus on', input)
        setIsInputEditable({ ...isInputEditable, [input]: true, categories: false }) // have to reset manually categories to false since no blur on checkbox
    }

    // If user leaves input
    const inputBlurHandler = inputBlurred => {
        formik.handleSubmit()

        console.log('You want to leave', inputBlurred)
        formik.handleBlur
        setIsInputEditable({ ...isInputEditable, [inputBlurred]: false })
    }

    const inputsSharedClass =
        '!no-underline focus:!outline outline-offset-2 focus:bg-tertiary hover:bg-tertiary p-1 pr-2'

    const shouldSubmitBtnBeDisabled = () => {
        if (!formik.dirty) {
            // if no value change
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
        ${
            Object.values(isInputEditable).includes(true)
                ? 'opacity-100'
                : '!opacity-0 invisible'
        }
        transition-all
        text-white font-bold py-3 bg-primary rounded-lg w-full !mt-6`

    const [isMapVisible, setIsMapVisible] = useState(false)

    const mapToggleHandler = () => {
        setIsMapVisible(prev => !prev)
    }

    const setsCatInputToFalse = () => {
        setIsInputEditable({ ...isInputEditable, categories: false })
    }

    const categoriesToIterateOn = isInputEditable.categories
        ? SPOT_CATEGORIES
        : formik.values.categories

    return (
        <>
            <div className="px-4 md:px-9 xl:px-16 2xl:px-36">
                <div
                    className="grid grid-rows-3 grid-cols-3 gap-2 relative 
                        max-h-[100vh]"
                >
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
                                // src={TemporaryImgUrls[0]}
                                src={images[0]}
                                alt="Picture"
                                layout="fill"
                                className="object-cover rounded-sm"
                                priority={true}
                                quality={10}
                            />
                        )}
                        <div className="absolute float-left top-[85%]  2xl:top-[90%] left-[1.5%] flex gap-x-2">
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
                                src={TemporaryImgUrls[1]}
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
                                src={TemporaryImgUrls[2]}
                                alt="Picture"
                                layout="fill"
                                className="object-cover rounded-sm"
                                quality={10}
                            />
                        ) : (
                            <MissingImage />
                        )}
                    </div>

                    <div className="row-span-1 col-span-2 h-fit mt-2">
                        <div className="space-y-4">
                            <div
                                className={`inputElem flex items-center justify-between gap-x-3 text-form-color`}
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
                                    className={`${HEADER_TITLE_FS} ${
                                        validStyling('title').border
                                    }
                                        ${inputsSharedClass} font-bold w-1/2 pr-2`}
                                />
                                {currentUserID === author._id ? (
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
                            <div className="flex items-center justify-between gap-x-3 text-form-color">
                                <div className="flex flex-wrap gap-1 pr-6 max-w-[60%]">
                                    {categoriesToIterateOn.map(category => (
                                        <SpotCategory
                                            key={category.name ?? category}
                                            icon={<MdOutlineRateReview />}
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
                                {currentUserID === author._id ? (
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
                            <div className="inputElem flex items-center justify-between gap-x-3 text-form-color">
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
                                    className={`${validStyling('description').border}
                                        ${inputsSharedClass} ${TEXTAREA_INPUTS_FS} w-[64%] h-60`}
                                ></textarea>

                                {currentUserID === author._id ? (
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
                    <div className="shadow-md border border-1 mt-2 flex flex-col gap-y-4 px-4 py-5 !h-fit">
                        <SpotGradeDisplayer />
                        <div className="flex justify-center gap-x-4">
                            <ButtonSpotCard
                                icon={<MdOutlineRateReview />}
                                text={'Review'}
                            />
                            <ButtonSpotCard icon={<BiEdit />} text={'Suggest edits'} />
                        </div>
                        <SpotterProfilePreview
                            authorName={author.name}
                            text={'Momin Sultan usually responds within 5 minutes'}
                        />
                        <DividerDesign />
                        <Toggler
                            onToggle={handleAddVisit}
                            didUserVisitSpot={didUserVisitSpot}
                        />
                    </div>
                </div>

                {1 === 1 && (
                    <div className="mt-60">
                        <p>Country: {country.name}</p>
                        <p> This Spot has been visited {nbOfVisit} times </p>

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

                        {/* Spot Deletion */}

                        {currentUserID === author._id && (
                            <h1 onClick={handleDelete}>Delete Spot</h1>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default ShowSpot
