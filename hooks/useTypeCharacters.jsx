import { useState, useEffect } from 'react'

// Input array of typed words here

const arrayOfActivities = ['Photo Spots.', 'Points of Interest.', 'Strolls.']

// Intervals constants
const TYPING_INTERVAL = 150
const PAUSE_MS = 1200
const DELETE_INTERVAL = 50

const useTypeCharacters = () => {
    // 3 phases possible : typing - pausing - deleting
    const [currentPhase, setCurrentPhase] = useState('typing')

    // this will be the current activity?
    const [activities, setActivities] = useState('Randonnée')

    // Will help us track index of word array
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        switch (currentPhase) {
            case 'typing': {
                const nextTypedActivities = arrayOfActivities[selectedIndex].slice(
                    0,
                    activities.length + 1,
                )
                if (nextTypedActivities === activities) {
                    // if the word is finished, set pausing
                    setCurrentPhase('pausing')
                    return
                }

                const timeout = setTimeout(() => {
                    setActivities(nextTypedActivities)
                }, TYPING_INTERVAL)

                return () => clearTimeout(timeout)
            }

            case 'deleting': {
                if (!activities) {
                    const nextIndex = selectedIndex + 1
                    setSelectedIndex(arrayOfActivities[nextIndex] ? nextIndex : 0)
                    setCurrentPhase('typing')
                    return
                }
                const nextRemaining = arrayOfActivities[selectedIndex].slice(
                    0,
                    activities.length - 1,
                )

                const timeout = setTimeout(() => {
                    setActivities(nextRemaining)
                }, DELETE_INTERVAL)

                return () => clearTimeout(timeout)
            }

            case 'pausing':
            default:
                const timeout = setTimeout(() => {
                    setCurrentPhase('deleting')
                }, PAUSE_MS)

                return () => clearTimeout(timeout)
        }
    }, [activities, currentPhase, selectedIndex])

    return { activities, currentPhase }
}

export default useTypeCharacters
