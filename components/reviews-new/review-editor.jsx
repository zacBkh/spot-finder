import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'

const ReviewEditor = ({ onReviewEditRequest }) => {
    return (
        <button
            onClick={onReviewEditRequest}
            className="flex items-center gap-x-2 hover:underline text-sm"
        >
            <BiEdit />
            <span>Edit your review</span>
        </button>
    )
}

export default ReviewEditor
