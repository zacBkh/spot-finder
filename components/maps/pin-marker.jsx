import * as React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Pin = ({ size }) => {
    return <FaMapMarkerAlt className="text-2xl text-red-700" />
}

export default React.memo(Pin)
