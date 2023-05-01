import Image from 'next/image'

const ErrorIllustration = ({ img, altTxt, title }) => {
    return <Image title={title ?? null} priority fill="true" src={img} alt={altTxt} />
}

export default ErrorIllustration
