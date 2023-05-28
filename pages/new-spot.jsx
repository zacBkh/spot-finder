import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react'

import { useFormik } from 'formik'
import SpotTextualInput from '../components/new-forms/textual-inputs'

import DynamicSpotCategory from '../components/new-forms/spots/dynamic-category-checkbox'

import DynamicMapForm from '../components/maps/dynamic-map-form'

import Spinner from '../components/spinner'

import { SMALL_TEXT_FS, BUTTON_FS, FORM_LABEL_FS } from '../constants/responsive-fonts'
import { DISABLED_STYLE, DISABLED_STYLE_STATELESS } from '../constants/disabled-style'
import { validTitleDesc } from '../constants/validation-schemas'

import getCountryCode from '../services/get-country-code'

import worldCountryDetails from '../utils/world-country-continents'

import { addSpotHandler } from '../services/mongo-fetchers'

import { PATHS } from '../constants/URLs'
import { TOAST_PARAMS } from '../constants/toast-query-params'

import SPOT_CATEGORIES from '../constants/spot-categories'

import dynamic from 'next/dynamic'

const {
    KEY,
    VALUE_CREATED_SPOT_SUCCESS,
    VALUE_CREATED_SPOT_FAILURE,
    VALUE_ADDED_PIC_SUCCESS,
} = TOAST_PARAMS

const AddNewSpot = ({}) => {
    const [disableActionBtns, setDisableActionBtns] = useState(false)

    const logicDisableNextStep = () => {
        if (disableActionBtns) {
            return true
        }

        if (!formik.dirty) {
            return true
        }

        if (formik.errors[lookUp[currentStep]]) {
            return true
        }

        if (formik.isSubmitting) {
            return true
        }
        return false // ok no error
    }

    const router = useRouter()

    const { data: session } = useSession()

    const [currentStep, setCurrentStep] = useState(1)

    const incrementStepHandler = operator => {
        if (operator === '-') {
            setCurrentStep(prevState => prevState - 1)
        } else if (operator === '+' && logicDisableNextStep() === false) {
            setCurrentStep(prevState => prevState + 1)
        }
    }

    const validStyling = field => {
        if (field === 'images') {
            if (formik.errors[field]) {
                return {
                    border: '!border-1 !border-primary',
                    message: (
                        <span className={`${SMALL_TEXT_FS} !text-primary `}>
                            {formik.errors[field]}
                        </span>
                    ),
                }
            } else {
                return { border: '', message: '' }
            }
        }
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: '!border-1 !border-primary',
                message: (
                    <span className={`${SMALL_TEXT_FS} !text-primary `}>
                        {formik.errors[field]}
                    </span>
                ),
            }
        } else {
            return { border: '', message: '' }
        }
    }

    // Map coordinates state, had to create this otherwise there is no re render and marker never moves
    const [markerCoordinates, setMarkerCoordinates] = useState('')

    const newCoordinateHandler = coordinates => {
        setMarkerCoordinates(coordinates)
    }

    // Set value of the field imperatively
    useEffect(() => {
        formik.setFieldValue('coordinates', markerCoordinates)
    }, [markerCoordinates])

    const onSubmitHandler = async formValues => {
        setDisableActionBtns(true)
        const { title, description, categories, coordinates, images } = formValues
        const descTitleCat = {
            title: title.trim(),
            description: description.trim(),
            categories: categories.sort(),
        }

        const geometry = {
            type: 'Point',
            coordinates: [coordinates[0], coordinates[1]],
        }

        // Add country names
        const countryCode = await getCountryCode(coordinates[0], coordinates[1])

        // Adding region
        const country = worldCountryDetails.find(country => country.code === countryCode)

        // Combining values + GeoJSON + country + images
        const newObjectWithGeoJSON = {
            ...descTitleCat,
            geometry,
            country,
            images,
        }

        // Adding the author + visitor
        const finalNewSpotObject = {
            ...newObjectWithGeoJSON,
            author: session.userID,
            visitors: [session.userID],
        }

        const submissionStatus = await addSpotHandler(finalNewSpotObject)
        if (!submissionStatus.success) {
            router.push(`${PATHS.HOME}?${KEY}=${VALUE_CREATED_SPOT_FAILURE}`)
        } else {
            router.push(`${PATHS.HOME}?${KEY}=${VALUE_CREATED_SPOT_SUCCESS}`)
        }
    }

    const initialValues = {
        title: '',
        description: '',
        categories: [],
        coordinates: markerCoordinates,
        images: [],
    }

    const formik = useFormik({
        initialValues,
        onSubmit: onSubmitHandler,
        validationSchema: validTitleDesc,
    })

    const initialCoordinates = {
        longitude: 55.18,
        latitude: 25.07,
        zoom: 2,
    }

    const lookUp = {
        1: 'title',
        2: 'description',
        3: 'categories',
        4: 'coordinates',
        5: 'images',
    }

    const rightBtnState = () => {
        if (
            Object.keys(formik.errors).length === 0 &&
            currentStep === Object.keys(lookUp).length + 1
        ) {
            return { text: 'Submit', type: 'submit' }
        } else {
            return { text: 'Next', type: 'button' }
        }
    }

    const previousInputToBlur = inputStep => {
        if (inputStep < currentStep) {
            return true
        }
        return false
    }

    const btnClassName = `${BUTTON_FS} ${DISABLED_STYLE}
    text-white font-bold py-3 bg-primary rounded-lg w-full !mt-6`

    // Takes new imgs URL from children and update parent state
    const imgUploadHandler = imageURL => {
        setUploadedImages(prevState => [...prevState, imageURL])
    }
    const [uploadedImages, setUploadedImages] = useState([])

    // Trigerred on every new image upload
    useEffect(() => {
        formik.setFieldValue('images', uploadedImages)

        if (currentStep === 5) {
            router.push(
                {
                    query: {
                        ...router.query,
                        [KEY]: VALUE_ADDED_PIC_SUCCESS,
                    },
                },
                undefined,
                { shallow: true },
            )
        }
    }, [uploadedImages])

    const DynamicImageUploader = dynamic(
        () =>
            import(
                /* webpackChunkName: 'lazy-loaded-image-uploader' */
                '../components/image-uploader-wrapper'
            ),
        {
            loading: () => <p>Loading Image Uploader...</p>,
        },
    )

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className="w-[80%] max-w-3xl mx-auto space-y-3"
            >
                <SpotTextualInput
                    formikWizard={formik.getFieldProps('title')}
                    identifier="title"
                    errorStying={validStyling('title')}
                    placeholder="e.g: Amazing night cityscape in Dubai."
                    shouldBeDisabled={previousInputToBlur(1)}
                    onEnterKeyPress={incrementStepHandler}
                />
                {currentStep > 1 && (
                    <SpotTextualInput
                        formikWizard={formik.getFieldProps('description')}
                        identifier="description"
                        errorStying={validStyling('description')}
                        placeholder="e.g: Breathtaking point of view perfect for romantic escapades or timelapse sessions."
                        shouldBeDisabled={previousInputToBlur(2)}
                        onEnterKeyPress={incrementStepHandler}
                        isTextArea
                    />
                )}
                {currentStep > 2 && (
                    <div>
                        <h1 className={`${FORM_LABEL_FS} mb-2`}>
                            Which category your Spot would best fit in ? *
                        </h1>
                        <div
                            className={`${
                                previousInputToBlur(3) && DISABLED_STYLE_STATELESS
                            } flex justify-center flex-wrap gap-2`}
                        >
                            {SPOT_CATEGORIES.map(category => (
                                <DynamicSpotCategory
                                    key={category.name}
                                    icon={category.icon}
                                    value={category.name}
                                    errorStying={validStyling('categories')}
                                    formikWizard={formik.getFieldProps('categories')}
                                    formikName="categories"
                                    catArray={formik.values.categories}
                                    shouldBeDisabled={previousInputToBlur(3)}
                                />
                            ))}
                        </div>
                        <div className="mx-auto w-fit">
                            {validStyling('categories').message}
                        </div>
                    </div>
                )}

                {/* MAP */}
                {currentStep > 3 && (
                    <>
                        <div
                            className={
                                previousInputToBlur(4)
                                    ? `${DISABLED_STYLE_STATELESS} cursorNotAllowedAsterix`
                                    : ''
                            }
                        >
                            <DynamicMapForm
                                initialView={initialCoordinates}
                                markerCoordinates={markerCoordinates}
                                onNewCoor={newCoordinateHandler}
                                shouldBeDisabled={previousInputToBlur(4)}
                            />
                        </div>
                    </>
                )}

                {/* PICTURE UPLOAD */}
                {currentStep > 4 && (
                    <>
                        <h1 className={`${FORM_LABEL_FS} !mt-6`}>
                            Upload pictures of your Spot *
                        </h1>
                        <DynamicImageUploader
                            onSuccessfulUpload={imgUploadHandler}
                            btnStyle={btnClassName}
                            uploadPreset={'spot-finder-spot-upload-preset'}
                            multiple={true}
                            maxFiles={3}
                        />
                        <div className="mx-auto w-fit">
                            {validStyling('images').message}
                        </div>
                    </>
                )}

                <div className="flex gap-x-2">
                    {/* SUBMIT  & BACK */}

                    {currentStep > 1 && (
                        <button
                            onClick={() => incrementStepHandler('-')}
                            className={`${btnClassName}`}
                            type="button"
                            disabled={formik.isSubmitting || disableActionBtns}
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={() => incrementStepHandler('+')}
                        disabled={logicDisableNextStep()}
                        className={btnClassName}
                        type={rightBtnState().type}
                    >
                        {rightBtnState().text}
                        {formik.isSubmitting ||
                            (disableActionBtns && (
                                <Spinner color={'border-t-secondary'} className="ml-2" />
                            ))}
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddNewSpot
