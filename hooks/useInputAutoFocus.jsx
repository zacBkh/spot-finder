import { useEffect } from 'react'

// Define the useRef where we call the component from
// Takes the inputRef variables we want to focus on and the variables that will determine which field we focus on it
// Return the right field to focus on
const useInputAutoFocus = (
    mailRef,
    nameRef,
    pwdRef,
    submitBtnRef,

    isResetPwd,
    authMode,
    isnewUser,
) => {
    console.log('isResetPwd', isResetPwd)
    useEffect(() => {
        console.log('customhookhavebeen')

        if (isResetPwd === true) {
            console.log('44444', 44444)
            return submitBtnRef.current.focus()
        }

        if (!authMode) {
            console.log('1111111', 1111111)

            return mailRef.current.focus()
        }
        if (authMode === 'credentials' && !isnewUser) {
            console.log('888', 888)

            return pwdRef.current.focus()
        }
        if (authMode === 'credentials' && isnewUser) {
            console.log('555', 555)

            return nameRef.current.focus()
        }
        console.log('458', 458)
    }, [authMode, isResetPwd, isnewUser, mailRef, nameRef, pwdRef, submitBtnRef])
}

export default useInputAutoFocus
