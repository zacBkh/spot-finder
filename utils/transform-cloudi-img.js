import CLOUDINARY_BASE_URL from '../constants/cloudinary'

const getCloudiImg = (quality = 'q_80,w_0.8', imgPath) => {
    const url = `${CLOUDINARY_BASE_URL}${
        quality === 'max' ? '' : `/${quality}`
    }/${imgPath}`
    return url
}

export default getCloudiImg
