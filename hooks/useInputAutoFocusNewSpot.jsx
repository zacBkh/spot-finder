import { useEffect } from 'react'

const useInputAutoFocusNewSpot = (
    titleRef,
    descRef,

    currentStep,
) => {
    useEffect(() => {
        if (currentStep === 1) {
            console.log('titleRef', titleRef)
            return titleRef.current.focus()
        }

        if (currentStep === 2) {
            console.log('descRef', descRef)
            return descRef.current.focus()
        }

        return
    }, [currentStep])
}

export default useInputAutoFocusNewSpot
