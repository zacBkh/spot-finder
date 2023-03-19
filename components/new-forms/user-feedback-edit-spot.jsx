import { BiEdit, BiCheck } from 'react-icons/bi'
import { AiOutlineWarning } from 'react-icons/ai'

import { FORM_LABEL_FS, ICON_EDITABLE_INPUTS_FS } from '../../constants/responsive-fonts'

const UserFeedback = ({
    input,
    isInputEditable,
    formikErrors,
    errorMsg,
    onClickEdit,
    text,
}) => {
    const baseDivClas = 'flex items-center gap-x-2 mr-4 '
    if (!isInputEditable[input] && !formikErrors[input]) {
        // if user did not focus anywehre
        return (
            <label
                onClick={() => onClickEdit(input)}
                className={`${baseDivClas} spotEditorElems  cursor-pointer`}
            >
                <BiEdit className={ICON_EDITABLE_INPUTS_FS} />
                <span className={`${FORM_LABEL_FS} hover:underline`}>{text}</span>
            </label>
        )
    }

    if (formikErrors[input]) {
        // if field has an error
        return (
            <label className={`${baseDivClas} text-primary cursor-auto`}>
                <AiOutlineWarning className={ICON_EDITABLE_INPUTS_FS} />
                <span className={`${FORM_LABEL_FS}`}>{errorMsg}</span>
            </label>
        )
    } else {
        // if no error
        return (
            <label className={`${baseDivClas} text-success cursor-auto`}>
                <BiCheck className={ICON_EDITABLE_INPUTS_FS} />
                <span className={`${FORM_LABEL_FS}`}>Your changes will be saved.</span>
            </label>
        )
    }
}

export default UserFeedback
