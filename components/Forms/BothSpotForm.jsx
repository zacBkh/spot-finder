import { useState, useEffect } from 'react';

import { useFormik } from "formik"
import * as Yup from "yup";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';

import InputsBoth from '../FormInputs/InputsBoth';
import CategoryCheckBoxItemBoth from '../CategoriesCheckboxes/CheckboxItemBoth';

import SpotMap from '../Mapbox/SpotMap';

import getCountryName from '../../utils/getCountryFetcher';

import { useSession } from "next-auth/react"



const BothSpotForm = ({ onAddOrEditFx, previousValues }) => {
    const { data: session } = useSession()

    const [characterCountTitle, setCharacterCountTitle] = useState(0);
    const [characterCountDescription, setCharacterCountDescription] = useState(0);



    // Yup stuff

    // Yup Validation Schema
    const validationSchemaYup = Yup.object().shape({
        title: Yup
            .string().trim()
            .min(6, `The title should be more than 6 characters, type ${5 - characterCountTitle} more!`)
            .required("Please enter a title from Yup!!"),

        description: Yup
            .string().trim()
            .min(6, `The title should be more than 6 characters, type ${5 - characterCountDescription} more!`)
            .required("Please enter a description from Yup!!"),


        categories: Yup
            .array()
            .min(1, "Please select at least one category!")
            .required("Category is required from Yup!"),

        locationDrag: Yup
            .object({
                Latitude: Yup.number().required("Please search your Spot or drag the Marker"),
                Longitude: Yup.number().required("Please search your Spot or drag the Marker")
            })
            .required("Please search your Spot or drag the Marker ++")
    });



    // Formik stuff 


    // Formik - Setting initial value and name to link with "name" attribute of <input>
    const initialValues = {
        title: previousValues ? previousValues.title : "",
        description: previousValues ? previousValues.description : "",
        categories: previousValues ? [...previousValues.categories] : [],
        locationDrag: previousValues ? previousValues.locationDrag : {}
    };

    // Formik - Submit Fx 
    const onSubmitFormik = async (formValues) => {
        console.log('SUBMIT-formValues', formValues)

        // Adding geoJSON coordinates
        const geometry = {
            "type": "Point",
            "coordinates": [
                formValues.locationDrag.Longitude,
                formValues.locationDrag.Latitude
            ]
        }

        // Adding country
        const Longitude = formValues.locationDrag.Longitude;
        const Latitude = formValues.locationDrag.Latitude;
        const country = await getCountryName(Longitude, Latitude)

        // Combining values + GeoJSON + country
        const newObjectWithGeoJSON = { ...formValues, geometry, country };


        let visitedField
        if (session) {
            console.log('sessionOKK', session)
            visitedField = { numberOfVisits: 1, visitors: session.userID }
        }

        // Adding the author + visitor
        const finalNewSpotObject = {
            ...newObjectWithGeoJSON,
            author: session.userID,
            visited: visitedField
        };




        onAddOrEditFx(finalNewSpotObject) // submit data
    }



    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmitFormik,
        validationSchema: validationSchemaYup
    })


    // When change in inputs, update character counting states
    useEffect(() => {
        setCharacterCountTitle(formik.values.title.trim().length)
    }, [formik.values.title])

    useEffect(() => {
        setCharacterCountDescription(formik.values.description.trim().length)
    }, [formik.values.description])




    // To decide if we display error msg for categories or not
    let categoryErrorMsg
    if (previousValues) { // if edit mode
        categoryErrorMsg = formik.errors.categories
    } else if (!previousValues && formik.touched.categories !== undefined) {
        categoryErrorMsg = formik.errors.categories
    }



    // Map coordinates state, had to create this state otherwise there is no re render and marker never moves
    const [markerCoordinates, setMarkerCoordinates] = useState(
        previousValues ?
            previousValues.locationDrag :
            ""
    );



    const onNewCoor = (param) => {
        console.log('paramFromBeforeFormik', param)
        // console.log('formikAAAAA', formik)
        setMarkerCoordinates(param)
    }


    // Otherwise does not get as a value for formik when use geocoder
    useEffect(() => {
        formik.values.locationDrag = markerCoordinates
    }, [markerCoordinates])



    // console.log('formik', formik)
    console.log('formik.values', formik.values)

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col justify-center px-96 mb-6'>

                <div>
                    <InputsBoth
                        labelName={"The title of your spot!"}
                        placeholder={"e.g: Amazing night cityscape in Dubai"}
                        formikName="title"

                        formikHasFieldBeenTouched={formik.touched.title == undefined ? false : formik.touched.title}
                        formikError={formik.errors}
                        wizard={formik.getFieldProps} // will store value, onChange and onBlur
                    />


                    <InputsBoth
                        labelName={"The description of your spot!"}
                        placeholder={"e.g: Nice bridge where you can..."}
                        formikName="description"

                        formikHasFieldBeenTouched={formik.touched.description == undefined ? false : formik.touched.description}
                        formikError={formik.errors}
                        wizard={formik.getFieldProps}
                    />
                </div>



                <div className='mb-6'>
                    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose technology:</h3>
                    <div className='flex justify-between'>
                        <CategoryCheckBoxItemBoth
                            icon={<BsFillTreeFill />}
                            value={"Nature"}
                            cardDescription={"The nature is the best part to see"}
                            catArray={formik.values.categories}

                            formikName={"categories"}
                            formikHandleChange={formik.handleChange}
                            formikHandleBlur={formik.handleBlur}
                        />


                        <CategoryCheckBoxItemBoth
                            icon={<BsBuilding />}
                            value={"Urban"}
                            cardDescription={"The city is the best part to see"}
                            catArray={formik.values.categories}

                            formikName={"categories"}
                            formikHandleChange={formik.handleChange}
                            formikHandleBlur={formik.handleBlur}
                        />

                        <CategoryCheckBoxItemBoth
                            icon={<BsSunset />}
                            value={"Sunset"}
                            cardDescription={"The sunset is the best part to see"}
                            catArray={formik.values.categories}

                            formikName={"categories"}
                            formikHandleChange={formik.handleChange}
                            formikHandleBlur={formik.handleBlur}
                        />
                    </div>


                    {/* For category validation */}
                    <span
                        className="text-red-600 block">
                        {categoryErrorMsg}
                    </span>
                </div>




                {/* Input where coordinates go */}
                <div className=''>
                    <input
                        disabled
                        type="text"
                        name="locationDrag"
                        {...formik.getFieldProps("locationDrag")}
                    />
                </div>

                {/* Valid error for map */}
                <div>
                    {
                        markerCoordinates === "" &&
                        formik.touched.locationDrag &&
                        formik.errors.locationDrag && <span className="text-red-600">{formik.errors.locationDrag.Latitude}</span>
                    }
                </div>

                <div>
                    <SpotMap
                        initialView={{
                            longitude: 55.18,
                            latitude: 25.07,
                            zoom: 2
                        }}
                        markerCoordinates={markerCoordinates}

                        onNewCoor={onNewCoor}
                    />
                </div>






                <button
                    type="submit"
                    className="
                    mt-6
                        text-white 
                        bg-blue-700 hover:bg-blue-800
                        font-medium text-sm rounded-lg text-center
                        w-fit sm:w-fit 
                        px-5 py-2.5  
                        disabled:opacity-75 disabled:cursor-not-allowed
                        focus:ring-4 focus:outline-none focus:ring-blue-300
                    "
                // disabled={Object.keys(formik.errors).length !== 0}


                > {previousValues ? "Edit" : "Submit"}
                </button>
            </form>

        </>
    );
}

export default BothSpotForm;
