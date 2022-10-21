import { useRef, useState } from 'react';
import CategoryCheckboxes from './CheckboxesForCategories/CategoryCheckboxes';

const EditSpotForm = ({ onEditSpot, intialValues, intialCheckbox }) => {


  // State for category checkbox
  const [categoriesSpotEdit, setCategoriesEdit] = useState(intialCheckbox);

  // Setting useRef
  const editSpotTitle = useRef();
  const editSpotDescription = useRef();


  // Fx executed in children lifting data up
  const checkboxHandler = (categories) => {
    setCategoriesEdit(categories)
    console.log('checkboxValuefromEditSpotForm', categories)
  }


  // Fires when EDIT form is submitted
  const submitHandlerEdit = (event) => {
    event.preventDefault();


    // Grab values of input
    const enteredTitle = editSpotTitle.current.value;
    const enteredDescription = editSpotDescription.current.value;


    // Gather in an object to send to server
    const editedSpotData = {
      title: enteredTitle,
      description: enteredDescription,
      categories: categoriesSpotEdit,
    };

    console.log('you want to update', editedSpotData)


    onEditSpot(editedSpotData); // using the fx to send to parent the data from the form

    event.target.reset();
  }










  return (
    <>
      {/* Should USE THE SAME COMPONENT THAN CREATE and pass ref throuhg propos to DRY */}
      <form
        onSubmit={submitHandlerEdit}
        className='max-w-md mx-auto'>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">The NEW title of your Spot!
          </label>
          <input
            ref={editSpotTitle}
            defaultValue={intialValues.title}
            type="text"
            id="title"
            className="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
            placeholder="e.g: Amazing night cityscape in Dubai" required=""
          />
        </div>


        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">The NEW description of your Spot!
          </label>
          <input
            ref={editSpotDescription}
            defaultValue={intialValues.description}
            type="text"
            id="description"
            className="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
            placeholder="e.g: Nice bridge where you can..." required=""
          />
        </div>



        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose technology:</h3>
        <CategoryCheckboxes
          category={"Nature"}
          categoryDescription={"The nature is the best place to photograph "}
          onCheckboxChange={checkboxHandler}
          intialCheckbox={intialCheckbox}
        />







        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

      </form>
    </>
  );
}

export default EditSpotForm;
