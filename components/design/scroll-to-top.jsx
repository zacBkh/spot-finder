import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const ScrollToTopBtn = ({ iconSize, wrapperCSS, shouldBounce }) => {
    return (
        <a
            aria-label="Go to the top of the page"
            href="#"
            className={`mt-auto drop-shadow-lg ${wrapperCSS} 
            ${shouldBounce ? 'animate-bounce' : ''}`}
        >
            <BsFillArrowUpCircleFill className={`${iconSize}`} />
        </a>
    )
}

export default ScrollToTopBtn
