import { useState, useRef } from 'react';


import CategoryCheckBoxItemNew from './CategoriesCheckboxes/CheckboxItemNEW';


import { BsFillTreeFill, BsBuilding } from 'react-icons/bs';

import InputsNew from './FormInputs/InputsNew';



const NewSpotForm = ({ onAddSpot }) => {

  // Local State
  const [categoriesNew, setCategoriesNew] = useState([]);


  // Use Ref set up // Refs are passed to children
  const spotTitle = useRef();
  const spotDescription = useRef();




  // Fx get data from children and update local cat state
  const newCheckBoxHandler = (category) => {
    console.log('category --->', category)

    if (!categoriesNew.includes(category)) { // if cat iis not part of the array yet
      setCategoriesNew([...categoriesNew, category])
      console.log('1111')

    } else { // if cat is part of arra y --> remove it
      setCategoriesNew((prevState) => prevState.filter((x) => x !== category))
      console.log('2222')
    }
  }




  // Fires when form is submitted
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = spotTitle.current.value;
    const enteredDescription = spotDescription.current.value;

    console.log('enteredTitle', enteredTitle)

    const spotData = {
      title: enteredTitle,
      description: enteredDescription,
      categories: categoriesNew,
    };

    onAddSpot(spotData); // using the fx to send to parent the data from the form

    event.target.reset();
  }






  return (
    <>
      <form
        onSubmit={submitHandler}
        className='max-w-md mx-auto'>


        <InputsNew
          accessibility={"title"}
          labelName={"The title of your spot!"}
          placeholder={"e.g: Amazing night cityscape in Dubai"}
          refWatcher={spotTitle}
        />

        <InputsNew
          accessibility={"description"}
          labelName={"The description of your spot!"}
          placeholder={"e.g: Nice bridge where you can..."}
          refWatcher={spotDescription}
        />






        <h3
          className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose technology:
        </h3>

        <div className='flex flex-col md:flex-row md:space-x-4'>
          <CategoryCheckBoxItemNew
            icon={<BsFillTreeFill />}
            value={"Nature"}
            name={"category"}
            cardTitle={"Nature"}
            cardDescription={"The nature is the best part to see"}
            onCheckboxChange={newCheckBoxHandler}
          />




          <CategoryCheckBoxItemNew
            icon={<BsBuilding />}
            value={"Urban"}
            name={"category"}
            cardTitle={"Urban"}
            cardDescription={"The nature is the best part to see"}
            onCheckboxChange={newCheckBoxHandler}
          />
        </div>

        <button
          type="submit"
          className="text-white
          bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:outline-none focus:ring-blue-300 
            text-sm font-medium 
            rounded-lg 
            w-full sm:w-auto 
            px-5 py-2.5 
            text-center"> Submit
        </button>
      </form>
    </>
  );
}

export default NewSpotForm;
