import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const ScrollToTopBtn = ({ iconSize }) => {
    return (
        <a href="#" className="mt-auto animate-bounce drop-shadow-lg ">
            <BsFillArrowUpCircleFill className={`${iconSize}`} />
        </a>
    )
}

export default ScrollToTopBtn
