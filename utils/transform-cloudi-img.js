import CLOUDINARY_BASE_URL from '../constants/cloudinary'

const getCloudiImg = (quality = 'q_5,w_0.5', imgPath) => {
    const url = `${CLOUDINARY_BASE_URL}/${quality}/${imgPath}`
    return url
}

export default getCloudiImg
