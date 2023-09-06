import Image from 'next/image'

const ImageDemo = ({ activeFeature, arrayOfImages, onFeatChangeFromImgClick }) => {
    console.log('arrayOfImages', arrayOfImages)
    return (
        <div
            className={` overflow-x-hidden mx-auto transition-colors duration-500 
            ${activeFeature % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
        >
            <div className="relative translate-x-[10%] sm:translate-x-[10%] md:translate-x-[14%] lg:translate-x-[23%] xl:translate-x-[28%] 2xl:ml-28">
                <div
                    className="w-[70%] sm:sm:w-[550px] 2xl:sm:w-[700px]
                     flex transition-transform bounceTimingFunction duration-500 "
                    style={{ transform: `translateX(-${activeFeature * 100}%)` }}
                >
                    {arrayOfImages.map((img, index) => (
                        <img
                            onClick={() => onFeatChangeFromImgClick(index)}
                            key={img.id}
                            className={`${
                                activeFeature !== index ? 'opacity-60' : ''
                            } drop-shadow-md transition-all duration-500 bounceTimingFunction cursor-pointer py-10 px-6`}
                            id="index"
                            src={img.src}
                            alt="A feature"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageDemo
