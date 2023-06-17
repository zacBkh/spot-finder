import { useState } from 'react'
import { MdAddAPhoto } from 'react-icons/md'

import ImageUploader from '../components/image-uploader'

import Spinner from '../components/spinner'

const ImageUploaderWrapper = ({
    btnStyle,
    onSuccessfulUpload,
    headless,
    children,

    uploadPreset,
    maxFiles,
    multiple,
    cropping,

    shouldBeDisabled,
}) => {
    const [isWidgetLoading, setIsWidgetLoading] = useState(false)

    // To be put in separate file to be reused on other image uploads
    const uploadHandler = (error, result) => {
        setIsWidgetLoading(false)
        if (error) {
            console.log('error from cld widget', error)
            return
        }
        if (result) {
            onSuccessfulUpload(result.info.path)
        }
    }

    return (
        <>
            <ImageUploader
                // What to do once upload is done
                onUpload={uploadHandler}
                uploadPreset={uploadPreset}
                maxFiles={maxFiles}
                multiple={multiple}
                cropping={cropping}
            >
                {({ open }) => {
                    function handleOnClick(e) {
                        setIsWidgetLoading(true)
                        e.preventDefault()
                        open()
                        setTimeout(() => {
                            setIsWidgetLoading(false)
                        }, 6000)
                    }

                    if (headless) {
                        return (
                            <>
                                <button
                                    aria-label="Upload image"
                                    disabled={shouldBeDisabled}
                                    type="button"
                                    onClick={handleOnClick}
                                >
                                    {children}
                                </button>
                            </>
                        )
                    } else {
                        return (
                            <button
                                aria-label="Upload image"
                                disabled={shouldBeDisabled}
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
                    }
                }}
            </ImageUploader>
        </>
    )
}

export default ImageUploaderWrapper
