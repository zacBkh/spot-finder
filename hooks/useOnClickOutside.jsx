import { useEffect } from 'react'

// Takes the ref pointing to the div we want to watch clickOutside for and the handler
const useOnClickOutside = (refOutside, handler) => {
    console.log('customHookRun')
    useEffect(() => {
        const listener = event => {
            if (refOutside.current && !refOutside.current.contains(event.target)) {
                handler(true, event)
            }
        }

        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('click', listener)
        }
    }, [refOutside, handler])
}

export default useOnClickOutside
