import { useState, useRef } from 'react';

import CategoryCheckboxes from './CheckboxesForCategories/CategoryCheckboxes';
const NewSpotForm = ({ onAddSpot }) => {

  const [categoriesNew, setCategoriesNew] = useState();

  // Use Ref set up
  const spotTitle = useRef();
  const spotDescription = useRef();



  // Fx executed in children lifting data up
  const checkboxHandler = (categories) => {
    setCategoriesNew(categories)
    console.log('checkboxValuefromNewSpotForm', categories)
  }

  // Fires when form is submitted
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = spotTitle.current.value;
    const enteredDescription = spotDescription.current.value;


    const spotData = {
      title: enteredTitle,
      description: enteredDescription,
      categories: categoriesNew,
    };

    console.log('spotData', spotData)

    onAddSpot(spotData); // using the fx to send to parent the data from the form

    event.target.reset();
  }






  return (
    <>
      <form
        onSubmit={submitHandler}
        className='max-w-md mx-auto'>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">The title of your Spot!
          </label>
          <input
            ref={spotTitle}
            type="text"
            id="title"
            className="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
            placeholder="e.g: Amazing night cityscape in Dubai" required=""
          />
        </div>


        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">The description of your Spot!
          </label>
          <input
            ref={spotDescription}
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
        />



        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      </form>
    </>
  );
}

export default NewSpotForm;
