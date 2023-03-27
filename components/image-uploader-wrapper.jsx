import { useState } from 'react'
import { MdAddAPhoto } from 'react-icons/md'

import ImageUploader from '../components/image-uploader'

import Spinner from '../components/spinner'

const ImageUploaderWrapper = ({ btnStyle, onSuccessfulUpload }) => {
    const [isWidgetLoading, setIsWidgetLoading] = useState(false)

    // To be put in separate file to be reused on other image uploads
    const uploadHandler = (error, result) => {
        setIsWidgetLoading(false)
        if (error) {
            console.log('error', error)
            return
        }
        if (result) {
            onSuccessfulUpload(result.info.secure_url)
        }
    }

    return (
        <>
            <ImageUploader
                // What to do once upload is done
                onUpload={uploadHandler}
            >
                {({ open }) => {
                    function handleOnClick(e) {
                        setIsWidgetLoading(true)
                        setTimeout(() => {
                            setIsWidgetLoading(false)
                        }, 5000)
                        e.preventDefault()
                        open()
                    }
                    return (
                        <button
                            onClick={handleOnClick}
                            className={`${btnStyle} flex justify-center items-center gap-x-6`}
                        >
                            {isWidgetLoading ? (
                                <>
                                    The uploader will open soon...
                                    <Spinner
                                        color={'border-t-secondary'}
                                        className="ml-2"
                                    />
                                </>
                            ) : (
                                <>
                                    Upload images of your Spot
                                    <MdAddAPhoto className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    )
                }}
            </ImageUploader>
        </>
    )
}

export default ImageUploaderWrapper
