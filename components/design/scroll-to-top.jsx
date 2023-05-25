import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const ScrollToTopBtn = ({ iconSize, wrapperCSS, shouldBounce }) => {
    return (
        <a
            href="#"
            className={`mt-auto drop-shadow-lg ${wrapperCSS} 
            ${shouldBounce ? 'animate-bounce' : ''}`}
        >
            <BsFillArrowUpCircleFill className={`${iconSize}`} />
        </a>
    )
}

export default ScrollToTopBtn
