import Image from 'next/image'

const dummyURL = [
    'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
]

const UserImage = ({ width, height, noBorder, picLink, title }) => {
    return (
        <div
            className={`${width} ${height} border rounded-full ${
                noBorder ? '' : 'border-primary'
            } overflow-hidden`}
        >
            <Image
                title={title ?? ''}
                width={200}
                height={200}
                quality={50}
                src={picLink ?? dummyURL[0]}
                alt={title ?? 'Dummy picture'}
                className="object-cover group-hover:scale-110 transition-transform duration-[175ms]"
            />
        </div>
    )
}

export default UserImage
