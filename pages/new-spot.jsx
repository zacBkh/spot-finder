import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react'

import { useFormik } from 'formik'
import SpotTextualInput from '../components/new-forms/textual-inputs'
import SpotCategory from '../components/new-forms/spots/category-checkbox'
import MapForm from '../components/Maps/MapForm'
import Spinner from '../components/spinner'

import { FORM_VALID_FS, BUTTON_FS, FORM_LABEL_FS } from '../constants/responsive-fonts'
import { DISABLED_STYLE, DISABLED_STYLE_STATELESS } from '../constants/disabled-style'
import { validTitleDesc } from '../constants/validation-schemas'

import getCountryName from '../services/get-country-name'
import worldCountryDetails from '../utils/world-country-continents'
import { addSpotHandler } from '../services/mongo-fetchers'

import { PATHS } from '../constants/URLs'
import { TOAST_PARAMS } from '../constants/toast-query-params'

import spotCategories from '../constants/spot-categories'

const { KEY, VALUE_CREATED_SPOT_SUCCESS, VALUE_CREATED_SPOT_FAILURE } = TOAST_PARAMS

const AddYourFormTrial = ({}) => {
    const logicDisableNextStep = () => {
        if (!formik.dirty) {
            return true
        }

        if (formik.errors[lookUp[currentStep]]) {
            return true
        }

        if (formik.isSubmitting) {
            return true
        }
        return false
    }

    const router = useRouter()

    const { data: session } = useSession()

    const [currentStep, setCurrentStep] = useState(1)

    const incrementStepHandler = operator => {
        console.log('operator', operator)

        if (operator === '-') {
            setCurrentStep(prevState => prevState - 1)
        } else if (operator === '+' && logicDisableNextStep() === false) {
            setCurrentStep(prevState => prevState + 1)
        }
    }

    const validStyling = field => {
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: '!border-1 !border-primary',
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
        const { title, description, categories, coordinates } = formValues
        const descTitleCat = {
            title: title.trim(),
            description: description.trim(),
            categories,
        }

        const geometry = {
            type: 'Point',
            coordinates: [coordinates[0], coordinates[1]],
        }

        // Add country names
        const countryData = await getCountryName(coordinates[0], coordinates[1])
        const { countryCode } = countryData

        // Adding region
        const country = worldCountryDetails.find(country => country.code === countryCode)

        // Combining values + GeoJSON + country
        const newObjectWithGeoJSON = {
            ...descTitleCat,
            geometry,
            country,
        }

        // Adding spot visit
        let visitedField
        if (session) {
            visitedField = { numberOfVisits: 1, visitors: session.userID }
        }

        // Adding the author + visitor
        const finalNewSpotObject = {
            ...newObjectWithGeoJSON,
            author: session.userID,
            visited: visitedField,
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
    }

    const rightBtnState = () => {
        if (
            Object.keys(formik.errors).length !== 0 ||
            currentStep < Object.keys(lookUp).length
        ) {
            return { text: 'Next', type: 'button' }
        } else {
            return { text: 'Submit', type: 'submit' }
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

    console.log('formik', formik)
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
                            {spotCategories.map(category => (
                                <SpotCategory
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
                        <div>
                            <input
                                disabled
                                value={`${markerCoordinates}`}
                                type="text"
                                name="coordinates"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <MapForm
                                initialView={initialCoordinates}
                                markerCoordinates={markerCoordinates}
                                onNewCoor={newCoordinateHandler}
                                shouldBeDisabled={previousInputToBlur(4)}
                            />
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
                            disabled={formik.isSubmitting}
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
                        {formik.isSubmitting && (
                            <Spinner color={'border-t-secondary'} className="ml-2" />
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddYourFormTrial
