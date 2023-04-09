const Comment = ({ formikWizardComment, errorFeedback }) => {
    const isCommentFieldError = errorFeedback.message !== ''
    console.log('isCommentFieldError', isCommentFieldError)
    return (
        <>
            <div className="space-y-2">
                <textarea
                    {...formikWizardComment}
                    id="message"
                    rows="8"
                    className={`${
                        isCommentFieldError
                            ? errorFeedback.border
                            : 'border-gray-300 focus:ring-2 focus:ring-secondary '
                    } block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border `}
                    placeholder="Write your review here..."
                ></textarea>
                {errorFeedback.message}
            </div>
        </>
    )
}

export default Comment
