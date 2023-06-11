import Image from 'next/image'

const ImageDemo = ({ activeFeature, arrayOfImages, onFeatChangeFromImgClick }) => {
    return (
        <div
            className={` overflow-x-hidden mx-auto transition-colors duration-500 
            ${activeFeature % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
        >
            <div className="relative translate-x-[10%] sm:translate-x-[10%] md:translate-x-[14%] lg:translate-x-[23%] xl:translate-x-[28%]">
                <div
                    className="w-[70%] sm:sm:w-[550px] 2xl:sm:w-[700px]
                     flex transition-transform bounceTimingFunction duration-500 "
                    style={{ transform: `translateX(-${activeFeature * 97}%)` }}
                >
                    {arrayOfImages.map((img, index) => (
                        <img
                            onClick={() => onFeatChangeFromImgClick(index)}
                            key={img}
                            className={`${
                                activeFeature !== index ? 'opacity-60' : ''
                            } drop-shadow-md transition-all duration-500 bounceTimingFunction cursor-pointer`}
                            id="index"
                            src={img}
                            alt="A feature"
                        />
                        // <Image
                        //     key={img}
                        //     alt={`Image of a feature`}
                        //     layout="fill"
                        //     objectFit="contain"
                        //     className={`
                        //  transition-all duration-500 bounceTimingFunction`}
                        //     src={img}
                        //     style={{ transform: `translateX(${index * 50}%)` }}
                        // />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageDemo
