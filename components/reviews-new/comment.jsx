const Comment = ({ formikWizardComment, errorFeedback }) => {
    const isCommentFieldError = errorFeedback.message !== ''
    return (
        <>
            <div className="space-y-2">
                <textarea
                    {...formikWizardComment}
                    id="message"
                    className={`${
                        isCommentFieldError
                            ? errorFeedback.border
                            : 'border-gray-300 focus:ring-2 focus:ring-secondary '
                    } h-24 sm:h-36 w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border `}
                    placeholder="Write your review here..."
                ></textarea>
                {errorFeedback.message}
            </div>
        </>
    )
}

export default Comment
