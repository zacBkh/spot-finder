import { useEffect } from 'react'

// Takes the ref pointing to the div we want to watch clickOutside for and the handler
const useOnClickOutside = (refOutside, handler) => {
    useEffect(() => {
        const listener = event => {
            if (!refOutside.current.contains(event.target)) {
                handler(event)
            }
        }

        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('click', listener)
        }
    }, [refOutside, handler])
}

export default useOnClickOutside
