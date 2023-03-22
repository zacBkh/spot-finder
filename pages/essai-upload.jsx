import ImageUploader from '../components/image-uploader'
import { useEffect } from 'react'

const EssaiUpload = ({}) => {
    const uploadHandler = (error, result, widget) => {
        if (error) {
            console.log('error', error)
            return
        }
        if (result) {
            console.log('result', result)
        }
    }

    return (
        <>
            <h1 className="baba">HELLO</h1>
            <ImageUploader
                // What to do once upload is done
                onUpload={uploadHandler}
            >
                {({ open }) => {
                    function handleOnClick(e) {
                        console.log('22', 22)
                        e.preventDefault()
                        open()
                    }
                    return <button onClick={handleOnClick}>Upload an Image</button>
                }}
            </ImageUploader>
        </>
    )
}

export default EssaiUpload
