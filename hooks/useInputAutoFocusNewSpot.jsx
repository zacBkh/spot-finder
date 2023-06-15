import { useEffect } from 'react'

const useInputAutoFocusNewSpot = (
    titleRef,
    descRef,

    currentStep,
) => {
    useEffect(() => {
        if (currentStep === 1) {
            return titleRef.current.focus()
        }

        if (currentStep === 2) {
            return descRef.current.focus()
        }

        return
    }, [currentStep])
}

export default useInputAutoFocusNewSpot
