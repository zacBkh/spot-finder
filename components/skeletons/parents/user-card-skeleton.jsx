import SkeletonText from '../text-skeleton'
import SkeletonImage from '../image-skeleton'

const SkeletonUserCard = () => {
    return (
        <>
            <SkeletonImage style={'w-20 sm:w-32 h-20 sm:h-32 rounded-full'} />
            <div className="flex flex-col">
                <SkeletonText type={'smTitle'} nbOfLines={3} gap={'gap-y-5'} />
            </div>
        </>
    )
}

export default SkeletonUserCard
