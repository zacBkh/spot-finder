import Image from 'next/image'

const ImageDemo = ({ activeFeature, arrayOfImages }) => {
    const temp = [
        'https://www.datocms-assets.com/50397/1665648856-payroll-fr.png?auto=format&dpr=0.7&w=1834',
        'https://www.datocms-assets.com/50397/1665649393-leaves-fr.png?auto=format&dpr=0.7&w=1834',
        'https://www.datocms-assets.com/50397/1665649664-people-fr.png?auto=format&dpr=0.7&w=1834',
        'https://www.datocms-assets.com/50397/1665649869-expense-fr.png?auto=format&dpr=0.7&w=1834',
    ]

    const getTranslate = index => {
        if (index === 0) {
            return 'translate-x-[0%]'
        }
        if (index === 1) {
            return 'translate-x-[50%]'
        }
        if (index === 2) {
            return 'translate-x-[100%]'
        }
        if (index === 3) {
            return 'translate-x-[150%]'
        }
    }
    return (
        <div
            className="
            mx-auto
            
            mb-24
          bg-primary"
        >
            <div className="overflow- relative translate-x-[30%]">
                <div
                    id="zaaza"
                    className="w-[550px] flex transition-transform bounceTimingFunction duration-500"
                    style={{ transform: `translateX(-${activeFeature * 100}%)` }}
                >
                    {arrayOfImages.map((img, index) => (
                        <img
                            className={`${
                                activeFeature !== index
                                    ? 'blur-[2px] opacity-80'
                                    : 'blur-0'
                            } drop-shadow-md transition-all duration-500 bounceTimingFunction `}
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
