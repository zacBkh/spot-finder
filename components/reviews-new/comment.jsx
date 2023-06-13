const Comment = ({ formikWizardComment, errorFeedback }) => {
    const isCommentFieldError = errorFeedback.message !== ''
    return (
        <>
            <div className="xl:h-[45%] 2xl:max-h-[60%] space-y-1 2xl:space-y-4">
                <textarea
                    {...formikWizardComment}
                    id="message"
                    className={`${
                        isCommentFieldError
                            ? errorFeedback.border
                            : 'border-gray-300 focus:ring-2 focus:ring-secondary '
                    } h-28 xl:h-36 2xl:h-48  w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border `}
                    placeholder="Write your review here..."
                ></textarea>
                {errorFeedback.message}
            </div>
        </>
    )
}

export default Comment
