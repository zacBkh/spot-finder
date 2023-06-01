import { useRef } from 'react'
import Script from 'next/script'

const ImageUploader = ({
    children,
    onUpload,
    uploadPreset,

    maxFiles,
    multiple,
    cropping,
}) => {
    const cloudinary = useRef()
    const widget = useRef()

    const createWidget = () => {
        const options = {
            maxFileSize: 800000,
            cloudName: 'dfaatxxwl',
            uploadPreset,
            resourceType: 'image',
            clientAllowedFormats: ['webp', 'jpg', 'png'],
            maxFiles,
            multiple,
            cropping,
            showSkipCropButton: false,
            croppingAspectRatio: 1.0,
            sources: ['local', 'url', 'instagram'],
            maxImageWidth: 1312,
            maxImageHeight: 894,
            text: {
                'en': {
                    'local': {
                        'dd_title_multi': 'Drag and Drop your best Spot pictures here!',
                    },
                },
            },

            styles: {
                palette: {
                    window: '#FFF',
                    windowBorder: '#90A0B3',
                    tabIcon: '#3b97ba',
                    menuIcons: '#5A616A',
                    textDark: '#403b45',
                    textLight: '#FFFFFF',
                    link: '#EF5E4E',
                    action: '#FF620C',
                    inactiveTabIcon: '#403b45',
                    error: '#F44235',
                    inProgress: '#EF5E4E',
                    complete: '#20B832',
                    sourceBg: '#E4EBF1',
                },
                frame: {
                    background: '#0E2F5B99',
                },
            },
        }

        return cloudinary.current?.createUploadWidget(options, function (error, result) {
            if (error || result.event === 'success') {
                onUpload(error, result)
            }
        })
    }

    const open = () => {
        // If no widget yet, we create a new one
        if (!widget?.current) {
            widget.current = createWidget()
        }

        // If widget already exist we open it
        widget?.current && widget.current.open()
    }

    // When script loads, store the cloudinary instance in a ref
    const handleOnLoad = () => {
        cloudinary.current = window.cloudinary
    }

    // pass the open function to children as an argument so I can access it where we use the uploader
    return (
        <>
            {children({ open })}
            <Script
                strategy="lazyOnload"
                id="cloudinary"
                src="https://widget.cloudinary.com/v2.0/global/all.js"
                onReady={handleOnLoad}
            />
        </>
    )
}

export default ImageUploader
