import { useState } from 'react'
import { BiEdit, BiCheck } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'

import {
    ICON_EDITABLE_INPUTS_FS,
    FORM_LABEL_FS,
    TEXTAREA_INPUTS_FS,
    SMALL_TEXT_FS,
} from '../../constants/responsive-fonts'
import { BODY_FS } from '../../constants/responsive-fonts'

import { useFormik } from 'formik'
import { validUserDescription } from '../../constants/validation-schemas'
import ButtonPrimary from '../design/button-primary'

import { editUserHandler } from '../../services/mongo-fetchers'

const UserDescription = ({
    userID,
    userName,
    initialDesc,
    isProfileOwner,

    onDescriptionUpdate,
}) => {
    const [isEditMode, setisEditMode] = useState(false)

    const onSubmitDesc = async formValues => {
        const changeUserDesc = await editUserHandler(
            false,
            formValues.description,
            userID,
        )
        setisEditMode(false)
        onDescriptionUpdate(changeUserDesc.success)
    }

    const formik = useFormik({
        initialValues: { description: initialDesc },
        onSubmit: onSubmitDesc,
        validationSchema: validUserDescription,
    })

    const description = formik.values?.description

    const validStyling = field => {
        if (formik.errors[field]) {
            return {
                border: '!border-2 !border-primary',
                message: formik.errors[field],
            }
        } else {
            return { border: '', message: '' }
        }
    }

    const descValid = (
        <div className={`${SMALL_TEXT_FS} !text-primary !mt-2`}>
            {`${validStyling('description').message}`}

            {`${
                description?.length < 500
                    ? ', ' + (40 - description?.length) + ' characters remaining'
                    : ''
            }`}
        </div>
    )

    const inputClass = `!no-underline focus:!outline outline-offset-2  bg-transparent focus:bg-tertiary hover:bg-tertiary`

    if (isProfileOwner) {
        // if is author
        return (
            <>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="flex justify-between items-center">
                        {!isEditMode ? (
                            <p className={`${BODY_FS} mr-6 `}>
                                {description ?? `You don't have a description yet.`}
                            </p>
                        ) : (
                            <>
                                <textarea
                                    {...formik.getFieldProps('description')}
                                    value={formik.values.description}
                                    id="description"
                                    name="description"
                                    className={`${inputClass} ${TEXTAREA_INPUTS_FS} 
                                    ${validStyling('description').border}
                                    resize w-[70%] h-20 border border-gray-200 rounded-md p-2`}
                                    placeholder={'Tell us more about yourself...'}
                                />
                            </>
                        )}
                        <label
                            htmlFor="description"
                            onClick={() => setisEditMode(prevState => !prevState)}
                            className={`flex items-center gap-x-2 mr-4 spotEditorElems cursor-pointer w-fit whitespace-nowrap`}
                        >
                            <div className={ICON_EDITABLE_INPUTS_FS}>
                                {isEditMode ? <MdOutlineCancel /> : <BiEdit />}
                            </div>
                            <span className={`${FORM_LABEL_FS} hover:underline`}>
                                {isEditMode ? 'Cancel' : 'Edit/Add a description'}
                            </span>
                        </label>
                    </div>
                    {isEditMode ? (
                        <>
                            {formik.errors.description ? descValid : ''}
                            <ButtonPrimary
                                icon={<BiCheck />}
                                shouldBeDisabled={
                                    formik.isSubmitting || formik.errors?.description
                                }
                                iconFirst
                                isSubmitBtn
                                isSmaller
                                text={'Save'}
                                additionalCSS={'!mt-4'}
                            />
                        </>
                    ) : (
                        ''
                    )}
                </form>
            </>
        )
    } else {
        // if visitor
        return (
            <div className="flex justify-between">
                <p className={`${BODY_FS}`}>
                    {initialDesc ?? `${userName} does not have a description yet.`}
                </p>
            </div>
        )
    }
}

export default UserDescription
