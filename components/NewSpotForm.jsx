import { useRef } from 'react';


const NewSpotForm = ({ onAddSpot }) => {


  // Use Ref set up
  const spotTitle = useRef();
  const spotDescription = useRef();



  // Fires when form is submitted
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = spotTitle.current.value;
    const enteredDescription = spotDescription.current.value;

    const spotData = {
      title: enteredTitle,
      description: enteredDescription,
    };

    onAddSpot(spotData); // using the fx to send to parent the data from the form

    event.target.reset();
  }






  return (
    <>
      <form
        onSubmit={submitHandler}
        className='max-w-md mx-auto'>

        <div class="mb-6">
          <label
            htmlFor="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">The title of your Spot!
          </label>
          <input
            ref={spotTitle}
            type="text"
            id="title"
            class="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
            placeholder="e.g: Amazing night cityscape in Dubai" required=""
          />
        </div>


        <div class="mb-6">
          <label
            htmlFor="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">The title of your Spot!
          </label>
          <input
            ref={spotDescription}
            type="text"
            id="description"
            class="text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500 block w-full p-2.5"
            placeholder="e.g: Nice bridge where you can..." required=""
          />
        </div>


        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      </form>
    </>
  );
}

export default NewSpotForm;
