import { MdOutlineEditLocation } from 'react-icons/md'
import { BsCamera } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

const ButtonPhoto = ({ type, isMapFullScreen, qtyPhotos }) => {
    let contentToDisplay

    const showPhotos = (
        <>
            <BsCamera className="w-4 h-4 md:w-5 md:h-5" />
            {`Show ${qtyPhotos} photos`}
        </>
    )

    const showMap = (
        <>
            <GoLocation className="w-4 h-4 md:w-5 md:h-5" />
            {isMapFullScreen ? 'Hide Map' : 'Show on Map'}
        </>
    )

    const suggestEditLocation = (
        <>
            <MdOutlineEditLocation className="w-4 h-4 md:w-5 md:h-5" />
            Edit your Spot Location
        </>
    )

    if (type === 'showPhotos') {
        contentToDisplay = showPhotos
    } else if (type === 'showMap') {
        contentToDisplay = showMap
    } else if (type === 'editLocation') {
        contentToDisplay = suggestEditLocation
    }

    return (
        <button
            className={`py-2 px-2 md:px-3 flex items-center gap-x-2 bg-white text-form-color rounded-lg shadow-md text-sm !hover:brightness-100`}
        >
            {contentToDisplay}
        </button>
    )
}

export default ButtonPhoto
