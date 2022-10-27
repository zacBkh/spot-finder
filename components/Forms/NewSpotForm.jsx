import { useState, useEffect } from 'react';

import { useFormik } from "formik"
import * as Yup from "yup";

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';

import InputsBoth from '../FormInputs/InputsBoth';
import CategoryCheckBoxItemBoth from '../CategoriesCheckboxes/CheckboxItemBoth';


const NewSpotForm = ({ onAddSpot }) => {
  // States for counting characters in fiels --> to be optimized ?
  const [characterCountTitle, setCharacterCountTitle] = useState(0);
  const [characterCountDescription, setCharacterCountDescription] = useState(0);


  // Yup stuff


  // Yup Validation Schema
  const validationSchemaYup = Yup.object().shape({
    title: Yup
      .string().trim()
      .min(6, `The title should be more than 6 characters, type ${6 - characterCountTitle} more!`)
      .required("Please enter a title from Yup!!"),

    description: Yup
      .string().trim()
      .min(6, "The description should be more than 6 characters!")
      .min(6, `The description should be more than 6 characters, type ${6 - characterCountDescription} more!`)
      .required("Please enter a description from Yup!!"),


    categories: Yup
      .array()
      .min(1, "Please select at least one category!")
      .required("Category is required from Yup!")
  });




  // Formik stuff 

  // Formik - Setting initial value and name to link with "name" attribute of <input>
  const initialValues = {
    title: "",
    description: "",
    categories: []
  };

  // Formik - Submit Fx 
  const onSubmitFormik = (formValues) => {
    console.log('SUBMIT-formValues', formValues)

    onAddSpot(formValues); // using the fx to send to parent the data from the form
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


  console.log('formik', formik)

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='max-w-md mx-auto'>



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





        <div>
          <h3
            className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose cateogry:
          </h3>

          <div className='flex flex-col md:flex-row md:space-x-4'>
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
        </div>


        {/* For category validation */}
        <span className="text-red-600 block">{formik.touched.categories === true && formik.errors.categories} </span>

        <button
          disabled={!formik.isValid}
          type="submit"
          className="text-white
                bg-blue-700 enabled:hover:bg-blue-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 
                  text-sm font-medium 
                  rounded-lg 
                  w-full sm:w-auto 
                  px-5 py-2.5 
                  text-center
                  disabled:opacity-80 disabled:cursor-not-allowed	"
        > Submit

        </button>
      </form>
    </>
  );
}

export default NewSpotForm;
