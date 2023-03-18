import { BsCamera } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

const ButtonPhoto = ({ type, isMapFullScreen, onMapToggle }) => {
    return (
        <>
            <button
                onClick={onMapToggle}
                className="flex items-center gap-x-2 bg-white text-form-color py-2 px-3 rounded-lg shadow-md"
            >
                {type === 'showPhotos' ? (
                    <>
                        <BsCamera className="w-4 h-4" />
                        Show 21 photos
                    </>
                ) : (
                    <>
                        <CiLocationOn className="w-5 h-5" />
                        {isMapFullScreen ? 'Hide Map' : 'Show on Map'}
                    </>
                )}
            </button>
        </>
    )
}

export default ButtonPhoto
