import { useEffect } from 'react'

// Define the useRef where we call the component from
// Takes the inputRef variables we want to focus on and the variables that will determine which field we focus on it
// Return the right field to focus on
const useInputAutoFocus = (
    mailRef,
    nameRef,
    pwdRef,

    authMode,
    isnewUser,
) => {
    useEffect(() => {
        if (!authMode) {
            return mailRef.current.focus()
        }
        if (authMode === 'credentials' && !isnewUser) {
            return pwdRef.current.focus()
        }
        if (authMode === 'credentials' && isnewUser) {
            return nameRef.current.focus()
        }
    }, [authMode])
}

export default useInputAutoFocus
