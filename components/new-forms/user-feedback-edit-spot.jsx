import { BiEdit, BiCheck } from 'react-icons/bi'
import { AiOutlineWarning } from 'react-icons/ai'

const UserFeedback = ({
    input,
    isInputEditable,
    formikErrors,
    errorMsg,
    onClickEdit,
    text,
}) => {
    const baseDivClas = 'flex items-center gap-x-2'
    if (!isInputEditable[input] && !formikErrors[input]) {
        // if no edit started yet
        return (
            <label onClick={() => onClickEdit(input)} className={`${baseDivClas}`}>
                <BiEdit />
                <span className="hover:underline cursor-text spotEditorElems">
                    {text}
                </span>
            </label>
        )
    }

    if (formikErrors[input]) {
        // if field has an error
        return (
            <label className={`${baseDivClas}`}>
                <AiOutlineWarning className="text-primary" />
                {errorMsg}
            </label>
        )
    } else {
        // if all good
        return (
            <label className={`${baseDivClas}`}>
                <BiCheck />
                <span className="">Your changes will be saved</span>
            </label>
        )
    }
}

export default UserFeedback
