import { useState } from "react"
import { Rating } from '@mui/material';



// Formik
import { useFormik } from "formik"
import * as Yup from "yup";


const Review = ({ isAuthor, isLoggedIn, onReviewSubmit }) => {




    if (!isLoggedIn) {
        return (<h1> You must be logged in !</h1>)
    }



    if (isAuthor) {
        return (<h1> You are te author you cannot comment !</h1>)
    }


    // For star rating
    const [grade, setGrade] = useState(3);


    // Yup stuff
    // Yup Validation Schema
    const reviewValidationSchema = Yup.object().shape({
        comment: Yup
            .string().trim()
            .min(8, "Your comment should be at least 8 characters long!")
            .max(50, "Your comment should be 50 characters max!")
    })


    // Formik stuff 
    const initialComment = { comment: "" }


    // Formik - Submit Fx 
    const onSubmitFormik = async ({ comment }) => {
        if (grade <= 0) { return }

        // Putting it in an object
        const reviewValues = {
            comment: comment,
            rate: grade
        }
        console.log('reviewValues', reviewValues)

        // Shipping to parent
        onReviewSubmit(reviewValues)
    }


    // Formik - object that tells initial values of form + submit & valid fx
    const formik = useFormik({
        initialValues: initialComment,
        onSubmit: onSubmitFormik,
        validationSchema: reviewValidationSchema
    })


    // Logic to deliver valid error msg or red border color
    const validStyling = () => {
        if (formik.errors.comment && formik.touched.comment) {
            return { border: "border-2 border-rose-500", message: <span className="text-red-600">{formik.errors.comment}</span> }
        } else { // if at least one field has been touched
            return { border: null, message: null }
        }
    }







    const onRateChangeHandler = (event, newGrade) => {
        setGrade(newGrade);
        console.log("CHANGEEEEE", newGrade)
    }







    return (
        <>
            <div className='border-solid border-2 border-sky-500'>

                <div>
                    <Rating
                        name="simple-controlled"
                        value={grade}
                        onChange={(event, newGrade) => onRateChangeHandler(event, newGrade)}
                    />
                </div>
                {
                    grade <= 0 &&
                    <span className="text-red-600">Please grade the spot!</span>
                }




                {/* <div>
                    <Rating name="read-only" value={value} readOnly />
                </div> */}



                <form
                    onSubmit={formik.handleSubmit}>

                    {/* Text Area */}
                    <div className="w-full  border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label

                                htmlFor="comment"
                                className="sr-only">Your comment
                            </label>
                            <textarea
                                {...formik.getFieldProps('comment')}
                                id="comment"
                                rows="4"
                                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                placeholder="Write a comment..."
                                 /* autoFocus */ >
                            </textarea>
                        </div>
                    </div>
                    <button
                        type="submit"> SUBMIT FORM
                    </button>
                </form>
                <div>
                    {
                        validStyling().message
                    }
                </div>
            </div>
        </>
    )
}

export default Review 