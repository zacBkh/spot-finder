import Image from 'next/image'
import getCloudiImg from '../utils/transform-cloudi-img'

const UserImage = ({
    size,
    noBorder,
    picLink,
    title,
    alt,
    suggestAddCustom,
    noCloudi,
}) => {
    return (
        <div
            className={`${size} border rounded-full ${
                noBorder ? '' : 'border-primary'
            } overflow-hidden`}
        >
            <Image
                title={title ?? ''}
                width={200}
                height={200}
                quality={50}
                src={noCloudi ? picLink : getCloudiImg('q_50', picLink)}
                alt={alt ?? 'Profile picture of a user.'}
                className="object-cover group-hover:scale-110 transition-transform duration-[175ms]"
            />
        </div>
    )
}

export default UserImage
