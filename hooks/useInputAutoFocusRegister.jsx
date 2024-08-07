import { useEffect } from 'react'

// First, need to define the useRef in the component where we call the hook from
// Takes the inputRef variables we want to focus on and the variables that will determine which field we focus on it
// Return the right field to focus on
const useInputAutoFocusRegister = (
    mailRef,
    nameRef,
    pwdRef,
    submitBtnRef,

    isResetPwd,
    authMode,
    isnewUser,
) => {
    useEffect(() => {
        if (isResetPwd === true) {
            return submitBtnRef.current.focus()
        }

        if (!authMode) {
            return mailRef.current.focus()
        }
        if (authMode === 'credentials' && !isnewUser) {
            return pwdRef.current.focus()
        }
        if (authMode === 'credentials' && isnewUser) {
            return nameRef.current.focus()
        }
    }, [authMode, isResetPwd, isnewUser, mailRef, nameRef, pwdRef, submitBtnRef])
}

export default useInputAutoFocusRegister
