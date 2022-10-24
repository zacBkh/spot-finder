import { useState, useEffect } from 'react';

import { BsFillTreeFill, BsBuilding, BsSunset } from 'react-icons/bs';

import { useFormik } from "formik"
import * as Yup from "yup";

import InputsEdit from '../FormInputs/InputsEdit';



import CategoryCheckBoxItemEdit from '../CategoriesCheckboxes/CheckboxItemEDIT';

const EditSpotForm = ({ onEditSpot, previousValues, intialCheckbox }) => {
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
      .min(6, "The description should be more than 6 characters!")
      .min(6, `The title should be more than 6 characters, type ${5 - characterCountDescription} more!`)
      .required("Please enter a description from Yup!!"),


    categories: Yup
      .array()
      .min(1, "Please select at least one category!")
      .required("Category is required from Yup!")
  });



  // Formik stuff 

  // Formik - Setting initial value and name to link with "name" attribute of <input>
  const initialValues = {
    title: previousValues.title,
    description: previousValues.description,
    categories: [...previousValues.categories] // if we want to have a default one 
  };

  // Formik - Submit Fx 
  const onSubmitFormik = (formValues) => {
    console.log('SUBMIT-formValues', formValues)

    onEditSpot(formValues); // using the fx to send to parent the data from the form
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







  // State containing categories
  const [categoriesEdit, setCategoriesEdit] = useState(intialCheckbox);


  // Setting useRef
  // const editSpotTitle = useRef();
  // const editSpotDescription = useRef();



  // On change of category in children, update the local state
  const newCheckBoxHandlerEdit = (category) => {
    console.log('category --->', category)

    if (!categoriesEdit.includes(category)) { // if cat is not part of the array yet
      setCategoriesEdit([...categoriesEdit, category])
      console.log('1111')

    } else { // if cat is part of arra y --> remove it
      setCategoriesEdit((prevState) => prevState.filter((x) => x !== category))
      console.log('2222')
    }
  }



  // Fires when EDIT form is submitted
  // const submitHandlerEdit = (event) => {
  //   event.preventDefault();

  //   // Grab values of input
  //   const enteredTitle = editSpotTitle.current.value;
  //   const enteredDescription = editSpotDescription.current.value;


  //   // Gather in an object to send to server
  //   const editedSpotData = {
  //     title: enteredTitle,
  //     description: enteredDescription,
  //     categories: categoriesEdit,
  //   };

  //   console.log('you want to update', editedSpotData)


  //   onEditSpot(editedSpotData); // using the fx to send to parent the data from the form

  //   event.target.reset();
  // }


  console.log('formik', formik)

  return (
    <>
      <form
        // onSubmit={submitHandlerEdit}
        onSubmit={formik.handleSubmit}
        className='max-w-md mx-auto'>

        <InputsEdit
          labelName={"The title of your spot!"}
          placeholder={"e.g: Amazing night cityscape in Dubai"}
          formikName="title"

          formikHasFieldBeenTouched={formik.touched.title == undefined ? false : formik.touched.title}
          formikError={formik.errors}
          wizard={formik.getFieldProps} // will store value, onChange and onBlur
        />


        <InputsEdit
          labelName={"The description of your spot!"}
          placeholder={"e.g: Nice bridge where you can..."}
          formikName="description"

          formikHasFieldBeenTouched={formik.touched.description == undefined ? false : formik.touched.description}
          formikError={formik.errors}
          wizard={formik.getFieldProps}
        />




        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose technology:</h3>


        <div className='flex flex-col md:flex-row md:space-x-4'>
          <CategoryCheckBoxItemEdit
            icon={<BsFillTreeFill />}
            value={"Nature"}
            name={"categories"}
            cardTitle={"Nature"}
            cardDescription={"The nature is the best part to see"}

            formikHandleChange={formik.handleChange}
            catArray={formik.values.categories}
          />


          <CategoryCheckBoxItemEdit
            icon={<BsBuilding />}
            value={"Urban"}
            name={"categories"}
            cardDescription={"The nature is the best part to see"}

            formikHandleChange={formik.handleChange}
            catArray={formik.values.categories}
          />

          <CategoryCheckBoxItemEdit
            icon={<BsSunset />}
            value={"Sunset"}
            name={"categories"}
            cardDescription={"The Sunset is the best part to see"}

            formikHandleChange={formik.handleChange}
            catArray={formik.values.categories}
          />
        </div>


        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

      </form>
    </>
  );
}

export default EditSpotForm;
