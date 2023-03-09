import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs'
import { GiPalette } from 'react-icons/gi'
import { GoTelescope } from 'react-icons/go'

import { useRouter } from 'next/router'

import SpotTextualInput from '../../components/new-forms/textual-inputs'
import SpotCategory from '../../components/new-forms/spots/category-checkbox'
import { FORM_VALID_FS, BUTTON_FS, FORM_LABEL_FS } from '../../constants/responsive-fonts'
import DISABLED_STYLE from '../../constants/disabled-style'
import { validTitleDesc } from '../../constants/validation-schemas'
import Spinner from '../../components/spinner'

const AddYourFormTrial = ({}) => {
    const [currentStep, setCurrentStep] = useState(0)

    const incrementStepHandler = operator => {
        operator === '+'
            ? setCurrentStep(prevState => prevState + 1)
            : setCurrentStep(prevState => prevState - 1)
    }

    const validStyling = field => {
        if (formik.errors[field] && formik.touched[field]) {
            return {
                border: 'border-1 border-primary',
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

    let onSubmitHandler = async formValues => {
        console.log('you submitted with', formValues)
    }

    const initialValues = {
        title: '',
        description: '',
        categories: [],
    }

    const formik = useFormik({
        initialValues,
        onSubmit: onSubmitHandler,
        validationSchema: validTitleDesc,
    })

    const shouldSubmitBeDisabled = () => {
        return true
    }
    const whichNameNextBtn = () => {
        return 'Next'
    }

    console.log('formik', formik)
    console.log('formik.errors', formik.errors)

    const lookUp = {
        0: 'title',
        1: 'description',
        2: 'categories',
    }

    const previousInputToBlur = inputStep => {
        if (inputStep < currentStep) {
            return true
        }
        return false
    }

    const mustNextBtnBeDisabled = () => {
        if (!formik.dirty) {
            return true
        }

        if (formik.errors[lookUp[currentStep]]) {
            return true
        }
        return false
    }

    const btnClassName = `${BUTTON_FS} ${DISABLED_STYLE}
    text-white font-bold py-3 bg-primary rounded-lg w-full !mt-6`

    return (
        <>
            <form className="w-1/2 mx-auto space-y-3">
                <SpotTextualInput
                    formikWizard={formik.getFieldProps('title')}
                    identifier="title"
                    errorStying={validStyling('title')}
                    placeholder="e.g: Amazing night cityscape in Dubai."
                    shouldBeDisabled={previousInputToBlur(0)}
                />
                {currentStep > 0 && (
                    <SpotTextualInput
                        formikWizard={formik.getFieldProps('description')}
                        identifier="description"
                        errorStying={validStyling('description')}
                        placeholder="e.g: Breathtaking point of view perfect for romantic escapades or timelapse sessions."
                        shouldBeDisabled={previousInputToBlur(1)}
                        isTextArea
                    />
                )}
                {currentStep > 1 && (
                    <div>
                        <h1 className={`${FORM_LABEL_FS} mb-2`}>
                            Which category your Spot would best fit in ? *
                        </h1>
                        <div className="flex justify-center gap-x-2 ">
                            <SpotCategory
                                errorStying={validStyling('categories')}
                                formikWizard={formik.getFieldProps('categories')}
                                icon={<BsFillTreeFill />}
                                formikName="categories"
                                value="Nature"
                                catArray={formik.values.categories}
                            />
                            <SpotCategory
                                errorStying={validStyling('categories')}
                                formikWizard={formik.getFieldProps('categories')}
                                icon={<BsBuilding />}
                                formikName="categories"
                                value="Urban"
                                catArray={formik.values.categories}
                            />
                            <SpotCategory
                                errorStying={validStyling('categories')}
                                formikWizard={formik.getFieldProps('categories')}
                                icon={<BsSunset />}
                                formikName="categories"
                                value="Sunset"
                                catArray={formik.values.categories}
                            />
                            <SpotCategory
                                errorStying={validStyling('categories')}
                                formikWizard={formik.getFieldProps('categories')}
                                icon={<GiPalette />}
                                formikName="categories"
                                value="Art"
                                catArray={formik.values.categories}
                            />
                            <SpotCategory
                                errorStying={validStyling('categories')}
                                formikWizard={formik.getFieldProps('categories')}
                                icon={<GoTelescope />}
                                formikName="categories"
                                value="Astronomy"
                                catArray={formik.values.categories}
                            />
                        </div>
                        <div className="mx-auto w-fit">
                            {validStyling('categories').message}
                        </div>
                    </div>
                )}

                <div className="flex gap-x-2">
                    {/* SUBMIT  & BACK */}
                    <button
                        onClick={() => incrementStepHandler('-')}
                        className={`${btnClassName} ${currentStep === 0 && 'hidden'}`}
                        type="button"
                        // disabled={currentStep > 0 ? true : false}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => incrementStepHandler('+')}
                        // ref={submitBtnRef}
                        disabled={mustNextBtnBeDisabled()}
                        className={btnClassName}
                        type={formik.isValid ? 'submit' : 'button'}
                    >
                        {whichNameNextBtn()}
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
