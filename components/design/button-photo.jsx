import { BsCamera } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

import { BUTTON_FS } from '../../constants/responsive-fonts'
const ButtonPhoto = ({ type, isMapFullScreen, onMapToggle, qtyPhotos }) => {
    return (
        <>
            <button
                onClick={onMapToggle}
                className={`${BUTTON_FS} py-2 px-2 md:px-3  flex items-center gap-x-2 bg-white text-form-color rounded-lg shadow-md`}
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
