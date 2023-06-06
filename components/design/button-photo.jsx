import { BsCamera } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

const ButtonPhoto = ({ type, isMapFullScreen, qtyPhotos }) => {
    return (
        <>
            <button
                data-action={type}
                id={type}
                className={`py-2 px-2 md:px-3  flex items-center gap-x-2 bg-white text-form-color rounded-lg shadow-md text-sm z-[99999] !hover:brightness-100`}
            >
                {type === 'showPhotos' ? (
                    <>
                        <BsCamera className="w-4 h-4 md:w-5 md:h-5" />
                        {`Show ${qtyPhotos} photos`}
                    </>
                ) : (
                    <>
                        <GoLocation className="w-4 h-4 md:w-5 md:h-5" />
                        {isMapFullScreen ? 'Hide Map' : 'Show on Map'}
                    </>
                )}
            </button>
        </>
    )
}

export default ButtonPhoto
